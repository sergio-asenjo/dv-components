import { Component, Host, h, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'dv-stock-finder',
  styleUrl: 'dv-stock-finder.scss',
  shadow: true,
})
export class DvStockFinder {
  @State() stockUserInput: string = '';
  @State() searchResults: { symbol: string; name: string }[] = [];
  @State() loading: boolean = false;
  @Event({ bubbles: true, composed: true }) dvSymbolSelected: EventEmitter<string>;
  private stockNameInput: HTMLInputElement;
  private API_URL = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&apikey=W4KN67028HKNK0HD&keywords=';

  private async onFindStocks(event: Event) {
    event.preventDefault();
    this.loading = true;
    const stockName = this.stockNameInput.value;
    if (!stockName) return;
    try {
      const response = await fetch(this.API_URL + stockName);
      const data = await response.json();
      this.searchResults = data.bestMatches.map((match: any) => {
        return { symbol: match['1. symbol'], name: match['2. name'] };
      });
    } catch (error) {
      console.warn(error);
    } finally {
      this.loading = false;
    }
  }

  private onSelectSymbol(symbol: string) {
    this.dvSymbolSelected.emit(symbol);
  }

  render() {
    return (
      <Host>
        <form class="form" onSubmit={this.onFindStocks.bind(this)}>
          <input class="input__stock" ref={el => (this.stockNameInput = el)} />
          <button type="submit" class="button__stock">
            Find!
          </button>
        </form>
        {
          this.loading ? <dv-spinner /> :
          (this.searchResults.map(result => (
            <ul>
              <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
                <b>{result.symbol}</b> - {result.name}
              </li>
            </ul>
          )))
        }
      </Host>
    );
  }
}
