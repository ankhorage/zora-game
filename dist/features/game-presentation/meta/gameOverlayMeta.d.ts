/*** Describe a generic absolute game layer for HUD, feedback, and phase content. */
export declare const gameOverlayMeta: {
    readonly name: "GameOverlay";
    readonly category: "layout";
    readonly description: "Absolute presentation layer for HUD, feedback, controls, and phase content.";
    readonly directManifestNode: true;
    readonly allowedChildren: readonly ["Badge", "Button", "ButtonGroup", "Card", "GameEntity", "Heading", "Icon", "Image", "Progress", "ProgressRing", "Text", "View"];
    readonly blueprint: {
        readonly label: "Game overlay";
        readonly defaultProps: {
            readonly placement: "fill";
            readonly blocking: false;
            readonly padding: 0;
        };
    };
    readonly props: {
        readonly placement: {
            readonly type: "enum";
            readonly category: "Layout";
            readonly label: "Placement";
            readonly enum: readonly ["fill", "center", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"];
            readonly default: "fill";
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly blocking: {
            readonly type: "boolean";
            readonly category: "Interaction";
            readonly label: "Block pointer input";
            readonly default: false;
            readonly authoring: {
                readonly authority: "instance";
            };
        };
        readonly padding: {
            readonly type: "number";
            readonly category: "Layout";
            readonly label: "Padding";
            readonly default: 0;
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
//# sourceMappingURL=gameOverlayMeta.d.ts.map