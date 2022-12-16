import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'dv-drawer',
  styleUrl: 'dv-drawer.scss',
  shadow: true,
})
export class DvDrawer {

  render() {
    return (
      <Host>
        <aside>
          <slot>asdfasdf</slot>
        </aside>
      </Host>
    );
  }
}