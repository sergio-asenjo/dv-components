import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dv-drawer',
  styleUrl: 'dv-drawer.scss',
  shadow: true,
})
export class DvDrawer {
  @Prop({ reflect: true }) drawerHeader: string = 'Header Drawer';

  render() {
    return (
      <Host>
        <aside>
          <header>
            <h1>{this.drawerHeader}</h1>
            {/* // add an svg of an x to close the drawer  */}
            <svg class="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="rgba(255, 255, 255, 0.54)"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </header>
          <main>
            <slot />
          </main>
        </aside>
      </Host>
    );
  }
}
