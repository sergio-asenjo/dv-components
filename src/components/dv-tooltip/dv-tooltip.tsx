import { Component, Host, h, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'dv-tooltip',
  styleUrl: 'dv-tooltip.scss',
  shadow: true,
})
export class DvTooltip {
  @Prop() message: string;
  @Prop({ reflect: true, mutable: true }) shown: boolean = false;

  @Listen('click', { capture: true })
  public toggleTooltip() {
    this.shown = !this.shown;
  }

  render() {
    return (
      <Host>
        <div class="container">
          <slot>Let's test this tooltip</slot>
          <div class="tooltip">
            ? <div class="message">{this.message}</div>
          </div>
        </div>
      </Host>
    );
  }
}
