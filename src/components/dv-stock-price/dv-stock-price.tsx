import { Component, Host, h, State, Element, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'dv-stock-price',
  styleUrls: ['dv-stock-price.scss', '../../global/global.scss'],
  shadow: true,
})
export class DvStockPrice {
  @Element() el: HTMLElement;
  @Prop({ mutable: true }) error: boolean = false;
  @State() stockPrice: string = '0';
  @State() stockUserInput: string = '';
  @State() loading: boolean = false;
  stockInput: HTMLInputElement;
  private API_KEY: string = 'DEMO';
  private API_URL: string = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=${this.API_KEY}&symbol=`;

  private async onFetchStockPrice(event: Event) {
    event.preventDefault();
    this.loading = true;
    let stockSymbol = this.stockInput.value;
    if (event instanceof CustomEvent) {
      stockSymbol = event['detail'];
    }
    try {
      const response = await fetch(`${this.API_URL}${stockSymbol}`);
      const data = await response.json();
      if (data['Global Quote']['05. price'] === undefined) {
        throw new Error('Invalid symbol');
      }
      this.stockPrice = data['Global Quote']['05. price'];
      this.error = false;
    } catch (error) {
      this.error = true;
      console.warn(error.message);
    } finally {
      this.loading = false;
    }
  }

  @Listen('dvSymbolSelected', { target: 'body' })
  onStockSymbolSelected(event: CustomEvent) {
    if (event.detail && event.detail !== this.stockUserInput) {
      this.stockUserInput = event.detail;
      this.onFetchStockPrice(event);
    }
  }

  render() {
    return (
      <Host
        class={{
          'error': this.error,
        }}
      >
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
          {
            this.loading ? <dv-spinner /> :
            <div>
              {
                this.error ? <p class="price__stock">Invalid symbol</p>
                : <p class="price__stock">Price: ${this.stockPrice ?? 0}</p>
              }
            </div>
          }
        </div>
      </Host>
    );
  }
}
