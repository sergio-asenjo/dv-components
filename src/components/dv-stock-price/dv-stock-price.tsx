import { Component, Host, h, State, Element } from '@stencil/core';

@Component({
  tag: 'dv-stock-price',
  styleUrls: ['dv-stock-price.scss', '../../global/global.scss'],
  shadow: true,
})
export class DvStockPrice {
  @Element() el: HTMLElement;
  @State() stockPrice: string = '0';
  @State() stockUserInput: string = '';
  private stockInput: HTMLInputElement;
  private API_KEY: string = 'DEMO';
  private API_URL: string = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=${this.API_KEY}&symbol=`;

  private async onFetchStockPrice(event: Event) {
    event.preventDefault();
    const stockSymbol = this.stockInput.value;
    if (!stockSymbol) return;
    try {
      const response = await fetch(`${this.API_URL}${stockSymbol}`);
      const data = await response.json();
      this.stockPrice = data['Global Quote']['05. price'];
    } catch (error) {
      console.warn(error.message);
    }
  }

  render() {
    return (
      <Host>
        <div class="stock__card">
          <form class="form" onSubmit={this.onFetchStockPrice.bind(this)}>
            <input 
              class="input__stock" 
              value={this.stockUserInput}
              ref={el => this.stockInput = el}
              onInput={(event: Event) => (this.stockUserInput = event.target['value'])}
            />
            <button type="submit" class="button__stock">Fetch</button>
          </form>
          <div>
            <p class="price__stock">Price: ${this.stockPrice ?? 0}</p>
          </div>
        </div>
      </Host>
    );
  }
}
