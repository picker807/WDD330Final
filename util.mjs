export function saveSearchTerm() {
  const term = document.getElementById("location").value;
    const searchHistory = getSearchHistory() || [];

    if (!searchHistory.includes(term)){
      searchHistory.unshift(term);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    return term;
  }

function getSearchHistory() {
    var searchHistory = localStorage.getItem('searchHistory');
    return searchHistory ? JSON.parse(searchHistory) : null;
  }

export function loadSearchHistory() {
    //const term = document.getElementById("location").value;
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
    statusElem.innerHTML = `Searching for earthquakes within ${distance} miles of location`
  }

  export function toggleStatusVisible() {
    //const statusElem = document.getElementById("status-update");
    const loader = document. getElementById("loader");
  
    if (window.getComputedStyle(loader).display === "none") {
      //statusElem.style.display = "block";
      loader.style.display = "grid";
    } else {
      //statusElem.style.display = "none";
      loader.style.display = "none";
    }
  }