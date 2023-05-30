export function saveSearchTerm() {
  const term = document.getElementById("location").value;
  if (!term) {
    displayError("Enter a location to search");
  }
  const searchHistory = getSearchHistory() || [];
  if (!searchHistory.includes(term)){
    searchHistory.unshift(term);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
  return term;
}

export function getSearchHistory() {
  var searchHistory = localStorage.getItem('searchHistory');
  return searchHistory ? JSON.parse(searchHistory) : null;
}

export function loadSearchHistory() {
  var searchHistory = getSearchHistory();
  if (searchHistory && searchHistory.length > 0) {
    searchOptions.innerHTML = '';
    searchHistory.forEach(function(term) {
      var option = document.createElement('option');
      option.value = term;
      searchOptions.appendChild(option);
    });
  }
}

export function updateStatus(distance) {
  const statusElem = document.getElementById("status-update");
  statusElem.innerHTML = `Searching for earthquakes within <span id="status-number">${distance}</span> miles of location`;
}

export function toggleStatusVisible(show) {
  const loader = document.getElementById("loader");
  if (show) {
    loader.style.display = "grid";
  } else {
    loader.style.display = "none";
  }
}

export function displayError(message) {
  const errorBar = document.getElementById("error-bar");
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = message;
  errorBar.style.display = "block";

  setTimeout(() => {
    errorBar.style.display = "none";
  }, 5000);
}
