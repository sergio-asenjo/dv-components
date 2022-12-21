import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'dv-spinner',
  styleUrl: 'dv-spinner.scss',
  shadow: true,
})
export class DvSpinner {

  render() {
    return (
      <Host>
        <div class="lds-dual-ring"></div>
      </Host>
    );
  }

}
