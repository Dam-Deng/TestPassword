<template>
    <div class="md-dialog-container" :class="classes" @keyup.esc.stop="closeOnEsc" tabindex="0">
        <div class="md-dialog" ref="dialog" :style="styles" :class="dialogClasses">
            <slot></slot>
        </div>

        <div class="md-dialog-backdrop md-backdrop" :class="classes" ref="backdrop" @click="close" @keyup.esc="close"></div>
    </div>
</template>

<script>
    let transitionEndEventName = (function transitionEndEventName() {
        const el = document.createElement('span');
        const transitions = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd'
        };

        for (let transition in transitions) {
            if (el.style[transition] !== undefined) {
                return transitions[transition];
            }
        }
    })();

    export default {
        props: {
            mdClickOutsideToClose: {
                type: Boolean,
                default: true
            },
            mdEscToClose: {
                type: Boolean,
                default: true
            },
            mdBackdrop: {
                type: Boolean,
                default: true
            },
            mdOpenFrom: String,
            mdCloseTo: String,
            mdFullscreen: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            active: false,
            transitionOff: false,
            dialogTransform: ''
        }),
        computed: {
            classes() {
                return {
                    'md-active': this.active
                };
            },
            dialogClasses() {
                return {
                    'md-fullscreen': this.mdFullscreen,
                    'md-transition-off': this.transitionOff,
                    'md-reference': this.mdOpenFrom || this.mdCloseTo
                };
            },
            styles() {
                return {
                    transform: this.dialogTransform
                };
            }
        },
        methods: {
            removeDialog() {
                if (document.body.contains(this.dialogElement)) {
                    this.$el.parentNode.removeChild(this.$el);
                }
            },
            calculateDialogPos(ref) {
                const reference = document.querySelector(ref);

                if (reference) {
                    const openFromRect = reference.getBoundingClientRect();
                    const dialogRect = this.dialogInnerElement.getBoundingClientRect();
                    const widthInScale = openFromRect.width / dialogRect.width;
                    const heightInScale = openFromRect.height / dialogRect.height;
                    let distance = {
                        top: -(dialogRect.top - openFromRect.top),
                        left: -(dialogRect.left - openFromRect.left + openFromRect.width)
                    };

                    if (openFromRect.top > dialogRect.top + dialogRect.height) {
                        distance.top = openFromRect.top - dialogRect.top;
                    }

                    if (openFromRect.left > dialogRect.left + dialogRect.width) {
                        distance.left = openFromRect.left - dialogRect.left - openFromRect.width;
                    }

                    this.dialogTransform = `translate3D(${distance.left}px, ${distance.top}px, 0) scale(${widthInScale}, ${heightInScale})`;
                }
            },
            open() {
                document.body.appendChild(this.dialogElement);
                this.transitionOff = true;
                this.calculateDialogPos(this.mdOpenFrom);

                window.setTimeout(() => {
                    this.dialogElement.focus();
                    this.transitionOff = false;
                    this.active = true;
                });

                this.$emit('open');
            },
            closeOnEsc() {
                if (this.mdEscToClose) {
                    this.close();
                }
            },
            close() {
                if (document.body.contains(this.dialogElement)) {
                    this.$nextTick(() => {
                        let cleanElement = () => {
                            let activeRipple = this.dialogElement.querySelector('.md-ripple.md-active');

                            if (activeRipple) {
                                activeRipple.classList.remove('md-active');
                            }

                            this.dialogInnerElement.removeEventListener(transitionEndEventName, cleanElement);
                            document.body.removeChild(this.dialogElement);
                            this.dialogTransform = '';
                        };

                        this.transitionOff = true;
                        this.dialogTransform = '';
                        this.calculateDialogPos(this.mdCloseTo);

                        window.setTimeout(() => {
                            this.transitionOff = false;
                            this.active = false;
                            this.dialogInnerElement.addEventListener(transitionEndEventName, cleanElement);
                        });

                        this.$emit('close');
                    });
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.dialogElement = this.$el;
                this.dialogInnerElement = this.$refs.dialog;
                this.removeDialog();
            });
        },
        beforeDestroy() {
            this.removeDialog();
        }
    };
</script>


<style lang="scss">
    .md-dialog{
        background: #fff;
        padding: 16px;
    }

    .md-backdrop {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        pointer-events: none;
        background-color: rgba(#000, .54);
        transform: translate3d(0, 0, 0);
        opacity: 0;
        transition: all .5s cubic-bezier(.35, 0, .25, 1);

        &.md-active {
            opacity: 1;
            pointer-events: auto;
        }

        &.md-transparent {
            background: rgba(#000, .005);
        }
    }

    .md-dialog-container {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 108;

        &.md-active {
            pointer-events: auto;

            .md-dialog {
                opacity: 1 !important;
                transform: scale(1) !important;
                transition: all .5s cubic-bezier(.35, 0, .25, 1);
                transition-property: opacity, transform;
            }
        }
    }

    .md-dialog-backdrop {
        position: fixed;
        z-index: 109;
    }

    .md-dialog {
        min-width: 280px;
        max-width: 80%;
        max-height: 80%;
        display: flex;
        flex-flow: column;
        overflow: hidden;
        position: relative;
        z-index: 110;
        outline: none;
        border-radius: 2px;
        opacity: 0;
        box-shadow: 0 7px 9px -4px rgba(#000, .2),
        0 14px 21px 2px rgba(#000, .14),
        0 5px 26px 4px rgba(#000, .12);
        transform: scale(.9, .85);
        transform-origin: center center;
        transition: opacity .5s cubic-bezier(.25, .8, .25, 1),
        transform .5s .05s cubic-bezier(.25, .8, .25, 1);
        will-change: opacity, transform;

        &.md-reference {
            transform-origin: top center;
        }

        &.md-transition-off {
            transition: none !important;
        }

        p {
            margin: 0;
        }
    }

    .md-dialog-title {
        margin-bottom: 20px;
        padding: 24px 24px 0;
    }

    .md-dialog-content {
        padding: 0 24px 24px;
        flex: 1;
        flex-basis: auto;
        overflow: auto;
        position: relative;

        &:first-child {
            padding-top: 24px;
        }

        p:first-child:not(:only-child) {
            margin-top: 0;
        }

        p:last-child:not(:only-child) {
            margin-bottom: 0;
        }
    }

    .md-dialog-body {
        margin: 0 -24px;
        padding: 0 24px;
        overflow: auto;
    }

    .md-dialog-actions {
        min-height: 52px;
        padding: 8px 8px 8px 24px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: relative;

        &:before {
            height: 1px;
            position: absolute;
            top: -1px;
            right: 0;
            left: 0;
            content: " ";
        }

        .md-button {
            min-width: 64px;
            margin: 0;
            padding: 0 8px;

            + .md-button {
                margin-left: 8px;
            }
        }
    }

</style>