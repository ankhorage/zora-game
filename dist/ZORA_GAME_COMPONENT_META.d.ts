/*** Register the generic game presentation metadata owned by this package. */
export declare const ZORA_GAME_COMPONENT_META: {
    readonly GameEntity: {
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
    readonly GameField: {
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
    readonly GameOverlay: {
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
};
//# sourceMappingURL=ZORA_GAME_COMPONENT_META.d.ts.map