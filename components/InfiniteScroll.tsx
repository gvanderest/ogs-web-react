import * as _ from "lodash";
import * as React from "react";

export const DEFAULT_ROW_HEIGHT = 20; // pixels
export const DEFAULT_VIEWPORT_HEIGHT = 400; // pixels
export const DEFAULT_OVERFLOW_RECORDS = 10; // number of pre- and post- records

let uniqueIdentifier = 0;

interface IBaseRecord {
    id: any;
    [key: string]: any;
}

interface IProps {
    viewportHeight?: number;
    rowHeight?: number;
    className?: string;
    records?: any[];
    [key: string]: any;
}

interface IState {
    topIndex: number;
    viewportRecords: any[];
    rowHeight: number;
    detectedRowHeight: number;
    resizeHandler: (event: Event) => Event;
    scrollHeight: number;
    scrollTop: number;
    [key: string]: any;
}

interface IColumn {
    offsetWidth: number;
}

interface IViewport {
    scrollTop: number;
    scrollHeight: number;
}

export default class InfiniteScroll<IRecord extends IBaseRecord>
extends React.Component<IProps, IState> {
    public state: IState;
    public uniqueId: number;
    protected resizeHandler: (event: Event) => Event;
    constructor(props: IProps) {
        super(props);

        this.uniqueId = ++uniqueIdentifier;
        this.state = {
            detectedRowHeight: null,
            resizeHandler: null,
            rowHeight: null,
            scrollHeight: null,
            scrollTop: null,
            topIndex: 0,
            viewportRecords: [],
        };
    }
    public componentDidMount() {
        window.requestAnimationFrame(() => {
            this.sliceViewport(this.getRecords(this.props));
        });

        this.resizeHandler = this.handleWindowResize.bind(this);
        window.addEventListener("resize", this.resizeHandler);

        this.tableDidMount();
    }
    public componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);

        this.tableWillUnmount();
    }
    public componentWillReceiveProps(nextProps: IProps) {
        window.requestAnimationFrame(() => {
            this.sliceViewport(this.getRecords(nextProps));
        });
    }
    public render() {
        let recordComponents;
        const allRecords = (this.getRecords(this.props) || []) as IRecord[];
        const rowHeight = this.getRowHeight();
        const topIndex = this.state.topIndex;
        const anchorTop = topIndex * rowHeight;
        const viewportRecords = this.state.viewportRecords;

        const scaffoldHeight = allRecords.length * rowHeight;
        const scaffoldStyles = {
            height: scaffoldHeight + "px",
        };

        const anchorStyles = {
            left: "0px",
            position: "absolute" as "absolute",
            top: anchorTop + "px",
            width: "100%",
        };

        const viewportHeight = this.props.viewportHeight || DEFAULT_VIEWPORT_HEIGHT;
        const viewportStyles = {
            height: viewportHeight + "px",
            overflowX: "hidden" as "hidden",
            overflowY: "auto" as "auto",
            position: "relative" as "relative",
        };

        const bodyStyles = {
            width: "100%",
        };

        recordComponents = allRecords.length === 0 ? this.renderEmpty() : this.renderRecords(viewportRecords);

        const result = (
            <div className="infinite-scroll" ref="container">
                <div className="infinite-scroll-header">
                    <table className={ this.props.className } ref="header">
                        { this.renderHeader(allRecords) }
                    </table>
                </div>
                <div
                    className="infinite-scroll-viewport"
                    ref="viewport"
                    style={ viewportStyles }
                    onScroll={ this.handleScroll.bind(this) }
                >
                    <div className="infinite-scroll-scaffold" ref="scaffold" style={ scaffoldStyles }></div>
                    <div className="infinite-scroll-anchor" ref="anchor" style={ anchorStyles }>
                        <table ref="body" style={ bodyStyles } className={ this.props.className }>
                            <tbody key="infinite-scroll-body">
                                { recordComponents }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="infinite-scroll-footer">
                    <table className={ this.props.className || "" } ref="footer">
                        { this.renderFooter(allRecords) }
                    </table>
                </div>
            </div>
        );
        return result;
    }
    public componentDidUpdate() {
        window.requestAnimationFrame(() => {
            this.updateExternals();
            this.updateRowHeight();

            const { state } = this;
            const viewport = this.refs.viewport as HTMLElement;
            if (viewport.scrollHeight !== state.scrollHeight) {
                this.sliceViewport(this.getRecords(this.props));
            }
        });
    }
    protected getRowHeight() {
        return this.state.rowHeight || this.state.detectedRowHeight || DEFAULT_ROW_HEIGHT;
    }
    protected getViewportHeight() {
        return this.props.viewportHeight || DEFAULT_VIEWPORT_HEIGHT;

    }
    protected getRecords(props: IProps) {
        return props.records;
    }
    protected handleWindowResize() {
        this.handleScroll();
        setTimeout(this.handleScroll.bind(this), 100);
    }
    protected tableDidMount(): void {
        return;
    }
    protected tableWillUnmount(): void {
        return;
    }
    protected sliceViewport(records: IRecord[]) {
        if (!records) {
            records = [];
        }

        const viewport = this.refs.viewport as IViewport;
        if (!viewport) {
            return;
        }
        const scrollTop = viewport.scrollTop as number;
        const scrollHeight = viewport.scrollHeight as number;

        const viewportHeight = (this.props.viewportHeight || DEFAULT_VIEWPORT_HEIGHT) as number;
        const scrollBottom = scrollTop + viewportHeight;

        const topPercent = scrollHeight ? (scrollTop / scrollHeight) : 0;
        const bottomPercent = scrollHeight ? (scrollBottom / scrollHeight) : 0;

        const overflow = this.props.overflowRecords || DEFAULT_OVERFLOW_RECORDS;
        const numberOfRecords = records.length;
        const topIndex = Math.max(0, Math.floor(topPercent * numberOfRecords) - overflow);
        const bottomIndex = Math.min(records.length, Math.ceil(bottomPercent * numberOfRecords) + overflow);

        const viewportRecords = records.slice(topIndex, bottomIndex);
        this.setState({
            scrollHeight,
            scrollTop,
            topIndex,
            viewportRecords,
        });
    }
    protected updateExternals() {
        // TODO check header and footer exist first
        const externals = [];
        const header = this.refs.header;
        if (header) {
            externals.push(header);
        }
        const footer = this.refs.footer;
        if (footer) {
            externals.push(footer);
        }

        const body = this.refs.body as HTMLElement;
        if (!body) {
            return;
        }
        const bodyRows = body.getElementsByTagName("tr");
        const firstRow = bodyRows.length ? bodyRows[0] as HTMLElement : null;

        // Do nothing
        if (firstRow === null) {
            return;
        }

        const firstRowColumns = firstRow.getElementsByTagName("td");
        // FIXME do not use lodash
        const widths = _.map(firstRowColumns, (column: IColumn) => {
            return column.offsetWidth;
        });

        const records = this.getRecords(this.props);
        const recordsAreAvailable = records.length !== 0;

        _.each(externals, (external: HTMLElement) => {
            const columns = external.getElementsByTagName("th");
            let index = 0;
            _.each(columns, (column: HTMLElement) => {
                if (!recordsAreAvailable) {
                    delete column.style.width;
                    delete column.style.display;
                    delete column.style.overflowX;
                    delete column.style.textOverflow;
                    return;
                }

                const count: number = parseInt(column.getAttribute("colspan") || "1", 10);

                let width = 0;
                for (let y = 0; y < count; y++) {
                    const columnIndex = index + y;
                    const value = widths[columnIndex];
                    if (!isNaN(value)) {
                        width += value;
                    }
                }

                column.style.width = width + "px";
                column.style.display = "inline-block";
                column.style.overflowX = "hidden" as "hidden";
                column.style.textOverflow = "ellipsis";

                index += count;
            });
        });

    }
    protected handleScroll() {
        window.requestAnimationFrame(() => {
            this.sliceViewport(this.getRecords(this.props));
        });
    }
    protected getBodyStyle() {
        return {
            width: this.props.width || "100%",
        };
    }
    protected renderHeader(records: IRecord[]) {
        return null;
    }
    protected renderFooter(records: IRecord[]) {
        return null;
    }
    protected renderEmpty() {
        return null;
    }
    protected renderRecords(records?: IRecord[]) {
        const self = this;
        const rendered = records.map((record: IRecord) => {
            return this.renderRecord(record);
        });
        return rendered;
    }
    protected renderRecord(record: IRecord) {
        return (
            <tr key={ record.id }>
                <td>{ record.id }</td>
            </tr>
        );
    }
    protected updateRowHeight() {
        // Do not detect the rowHeight if it's provided
        if (this.props.rowHeight) {
            return;
        }
        const body = this.refs.body as HTMLElement;
        const rows = body.getElementsByTagName("tr");

        // Can't detect rows that don't exist
        if (rows.length === 0) {
            return;
        }

        let detectedRowHeight = rows[0].clientHeight;
        _.each(rows, (row: HTMLElement) => {
            detectedRowHeight = Math.min(detectedRowHeight, row.clientHeight);
        });

        if (this.state.detectedRowHeight !== detectedRowHeight) {
            this.setState({
                detectedRowHeight,
            });
        }
    }
}
