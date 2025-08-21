
document.querySelectorAll('.nav-item').forEach(item => {
  item.onclick = () => {
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    item.classList.add('active');
    document.getElementById(item.getAttribute('data-tab')).classList.add('active');
    if (item.getAttribute('data-tab') === 'top-stocks') {
      fetchLiveStocks();
    }
  };
});

function fetchLiveStocks() {
  var tableBody = document.querySelector('#live-stock-table tbody');
  tableBody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';
  fetch('https://stock.indianapi.in/trending', {
    headers: {'x-api-key': 'sk-live-ChUHaoLxV3JRIqZEhOLckUPmKf3br655HDpxKtUh'}
  })
    .then(r => r.json())
    .then(data => {
      var gainers = data.trending_stocks.top_gainers || [];
      var losers = data.trending_stocks.top_losers || [];
      var html = '';
      if (gainers.length) {
        html += '<tr><td colspan="6" style="background:#222;font-weight:bold;color:#2ed573;">Top Gainers</td></tr>';
        html += gainers.map(function(stock, i) {
          return '<tr>'+
            '<td>'+(i+1)+'</td>'+
            '<td>'+(stock.company_name||stock.ticker_id)+'</td>'+
            '<td>₹'+stock.price+'</td>'+
            '<td class="positive">'+stock.percent_change+'%</td>'+
            '<td>'+stock.net_change+'</td>'+
            '<td>'+(stock.volume||'-')+'</td>'+
          '</tr>';
        }).join('');
      }
      if (losers.length) {
        html += '<tr><td colspan="6" style="background:#222;font-weight:bold;color:#ff4757;">Top Losers</td></tr>';
        html += losers.map(function(stock, i) {
          return '<tr>'+
            '<td>'+(i+1)+'</td>'+
            '<td>'+(stock.company_name||stock.ticker_id)+'</td>'+
            '<td>₹'+stock.price+'</td>'+
            '<td class="negative">'+stock.percent_change+'%</td>'+
            '<td>'+stock.net_change+'</td>'+
            '<td>'+(stock.volume||'-')+'</td>'+
          '</tr>';
        }).join('');
      }
      if (!html) html = '<tr><td colspan="6">No live stock data available.</td></tr>';
      tableBody.innerHTML = html;
    });
}

document.addEventListener('DOMContentLoaded', function() {
  var topStocksTab = document.querySelector('.nav-item[data-tab="top-stocks"]');
  if (topStocksTab.classList.contains('active')) fetchLiveStocks();
});