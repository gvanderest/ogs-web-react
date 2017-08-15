interface IEventGamesCollectionScoring {
    // MLB
    triple_double?: number;
    steals?: number;
    turnovers?: number;
    blocks?: number;
    three_pts_made?: number;
    rebounds?: number;
    points?: number;
    double_double?: number;
    assists?: number;

    // NFL
    TE: {
        passing300YardsBonus: number;
        rushYards: number;
        receiving100YardsBonus: number;
        puntReturnTouchdowns: number;
        kickReturnTouchdowns: number;
        passingYards: number;
        passingTwoPoints: number;
        passingTouchdowns: number;
        receivingTouchdowns: number;
        rushingTouchdowns: number;
        offensiveInterceptions: number;
        receptions: number;
        fumblesLost: number;
        twoPointConversions: number;
        ownFumblesRecoveredTouchdowns: number;
        rushing100YardsBonus: number;
    };
    DST: {
        defensiveKicksBlockedTouchdowns: number;
        defensiveFumblesRecoveredTouchdowns: number;
        defensiveTwoPointReturns: number;
        defensiveFumblesRecovered: number;
        defensiveSafeties: number;
        defensiveKickReturnTouchdowns: number;
        defensiveInterceptions: number;
        defensivePointsAllowedRanges: [
            [number|string, number|string, number]
        ];
        defensiveInterceptionTouchdowns: number;
        defensiveSacks: number;
        defensivePuntReturnTouchdowns: number;
        defensiveKicksBlocked: number;
    };
    WR: {
        passing300YardsBonus: number;
        rushingYards: number;
        receiving100YardsBonus: number;
        puntReturnTouchdowns: number;
        kickReturnTouchdowns: number;
        passingYards: number;
        passingTwoPoints: number;
        passingTouchdowns: number;
        receivingTouchdowns: number;
        rushingTouchdowns: number;
        offensiveInterceptions: number;
        receptions: number;
        fumblesLost: number;
        twoPointConversions: number;
        ownFumblesRecoveredTouchdowns: number;
        rushing100YardsBonus: number;
    };
    RB: {
        passing300YardsBonus: number;
        rushingYards: number;
        receiving100YardsBonus: number;
        puntReturnTouchdowns: number;
        kickReturnTouchdowns: number;
        passingYards: number;
        passingTwoPoints: number;
        passingTouchdowns: number;
        receivingTouchdowns: number;
        rushingTouchdowns: number;
        offensiveInterceptions: number;
        receptions: number;
        fumblesLost: number;
        twoPointConversions: number;
        ownFumblesRecoveredTouchdowns: number;
        receivingYards: number;
        rushing100YardsBonus: number;
    };
    QB: {
        passing300YardsBonus: number;
        rushingYards: number;
        receiving100YardsBonus: number;
        puntReturnTouchdowns: number;
        kickReturnTouchdowns: number;
        passingYards: number;
        passingTwoPoints: number;
        passingTouchdowns: number;
        receivingTouchdowns: number;
        rushingTouchdowns: number;
        offensiveInterceptions: number;
        receptions: number;
        fumblesLost: number;
        twoPointConversions: number;
        ownFumblesRecoveredTouchdowns: number;
        receivingYards: number;
        rushing100YardsBonus: number;
    };
}
export default IEventGamesCollectionScoring;
