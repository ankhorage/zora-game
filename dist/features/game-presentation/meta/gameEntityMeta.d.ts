/*** Describe one positioned generic game entity for ZORA authoring tools. */
export declare const gameEntityMeta: {
    readonly name: "GameEntity";
    readonly category: "component";
    readonly description: "Positions arbitrary visual content inside a GameField without owning game rules.";
    readonly directManifestNode: true;
    readonly allowedChildren: readonly ["Badge", "Icon", "Image", "Text", "View"];
    readonly blueprint: {
        readonly label: "Game entity";
        readonly defaultProps: {
            readonly x: 0;
            readonly y: 0;
            readonly opacity: 1;
            readonly scale: 1;
            readonly rotation: 0;
            readonly zIndex: 0;
        };
    };
    readonly props: {
        readonly x: {
            readonly type: "number";
            readonly category: "Position";
            readonly label: "X (%)";
            readonly default: 0;
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly y: {
            readonly type: "number";
            readonly category: "Position";
            readonly label: "Y (%)";
            readonly default: 0;
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly width: {
            readonly type: "number";
            readonly category: "Size";
            readonly label: "Width";
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly height: {
            readonly type: "number";
            readonly category: "Size";
            readonly label: "Height";
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly opacity: {
            readonly type: "number";
            readonly category: "Appearance";
            readonly label: "Opacity";
            readonly default: 1;
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly scale: {
            readonly type: "number";
            readonly category: "Transform";
            readonly label: "Scale";
            readonly default: 1;
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly rotation: {
            readonly type: "number";
            readonly category: "Transform";
            readonly label: "Rotation";
            readonly default: 0;
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly zIndex: {
            readonly type: "number";
            readonly category: "Position";
            readonly label: "Z index";
            readonly default: 0;
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly hidden: {
            readonly type: "boolean";
            readonly category: "State";
            readonly label: "Hidden";
            readonly default: false;
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly pointerEvents: {
            readonly type: "enum";
            readonly category: "Interaction";
            readonly label: "Pointer events";
            readonly enum: readonly ["auto", "box-none", "box-only", "none"];
            readonly default: "auto";
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly accessibilityLabel: {
            readonly type: "string";
            readonly category: "Accessibility";
            readonly label: "Accessibility label";
            readonly authoring: {
                readonly authority: "instance";
            };
        };
    };
};
//# sourceMappingURL=gameEntityMeta.d.ts.map