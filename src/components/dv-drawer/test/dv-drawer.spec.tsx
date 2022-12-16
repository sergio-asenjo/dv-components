import { newSpecPage } from '@stencil/core/testing';
import { DvDrawer } from '../dv-drawer';

describe('dv-drawer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DvDrawer],
      html: `<dv-drawer></dv-drawer>`,
    });
    expect(page.root).toEqualHtml(`
      <dv-drawer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dv-drawer>
    `);
  });
});
