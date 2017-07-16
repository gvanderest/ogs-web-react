interface IState {
    byId: {
        [key: string]: ICustomer;
    };
};

const initialState: IState = {
};