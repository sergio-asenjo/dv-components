import { newE2EPage } from '@stencil/core/testing';

describe('dv-drawer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dv-drawer></dv-drawer>');

    const element = await page.find('dv-drawer');
    expect(element).toHaveClass('hydrated');
  });
});
