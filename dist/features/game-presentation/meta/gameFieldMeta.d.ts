/*** Describe the embeddable game field for ZORA authoring tools. */
export declare const gameFieldMeta: {
    readonly name: "GameField";
    readonly category: "layout";
    readonly description: "Relative positioning surface for embeddable game presentation content.";
    readonly directManifestNode: true;
    readonly allowedChildren: readonly ["GameEntity", "GameOverlay", "Gradient", "Image", "View"];
    readonly blueprint: {
        readonly label: "Game field";
        readonly defaultProps: {
            readonly minHeight: 320;
            readonly clip: true;
        };
    };
    readonly props: {
        readonly aspectRatio: {
            readonly type: "number";
            readonly category: "Layout";
            readonly label: "Aspect ratio";
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly minHeight: {
            readonly type: "number";
            readonly category: "Layout";
            readonly label: "Minimum height";
            readonly default: 320;
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly clip: {
            readonly type: "boolean";
            readonly category: "Layout";
            readonly label: "Clip overflow";
            readonly default: true;
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
//# sourceMappingURL=gameFieldMeta.d.ts.map