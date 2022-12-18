import { Component, Host, h, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'dv-drawer',
  styleUrl: 'dv-drawer.scss',
  shadow: true,
})
export class DvDrawer {
  @State() showContactInfo: boolean = false;
  @Prop({ reflect: true }) drawerHeader: string = 'Header Drawer';
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  private onContentChange(content: string) {
    this.showContactInfo = content === 'content';
  }

  @Method()
  public async toggleDrawer(): Promise<void> {
    this.open = !this.open;
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div class="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email</p>
          <ul>
            <li>Phone: 123-456-7890</li>
            <li>
              E-Mail: <a href="mailto:something@something.com">something@something</a>
            </li>
          </ul>
        </div>
      )
    }

    return (
      <Host>
        <div class="backdrop" onClick={this.toggleDrawer.bind(this)}></div>
        <aside>
          <header>
            <h1>{this.drawerHeader}</h1>
            <button class="close" onClick={this.toggleDrawer.bind(this)}>X</button>
          </header>
          <section class="tabs">
            <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
            <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'content')}>Contact</button>
          </section>
          <main>
            {mainContent}
          </main>
        </aside>
      </Host>
    );
  }
}
