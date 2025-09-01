function getIcon(condition) {
    condition = condition.toLowerCase();
    if (condition.includes("clear")) return "icons/clear.svg";
    if (condition.includes("cloud")) return "icons/clouds.svg";
    if (condition.includes("rain")) return "icons/rain.svg";
    if (condition.includes("snow")) return "icons/snow.svg";
    if (condition.includes("mist")) return "icons/mist.svg";
    if (condition.includes("thunder")) return "icons/thunder.svg";
    if (condition.includes("haze")) return "icons/haze.svg";
    if (condition.includes("sunny")) return "icons/clear.svg";
    if (condition.includes("overcast")) return "icons/overcast.png";
    if (condition.includes("shower in vicinity")) return "icons/shower-in-vicinity.png";
    return "icons/no-result.svg";
  }

  function getTemperature() {
    const inputField = document.getElementById("city");
    const city = inputField.value.trim();
    const loader = document.getElementById("searchLoader");
    const icon = document.getElementById("searchIcon");
    const result = document.getElementById("result");

    loader.style.display = "flex";
    icon.style.display = "none";
    result.textContent = "";

    if (!city) {
      loader.style.display = "none";
      result.textContent = "Please enter a city name.";
      icon.src = "icons/no-result.svg";
      icon.style.display = "inline-block";
      return;
    }

    fetch(`https://wttr.in/${city}?format=j1`)
      .then(res => res.json())
      .then(data => {
        loader.style.display = "none";

        const temp = data.current_condition?.[0]?.temp_C;
        const condition = data.current_condition?.[0]?.weatherDesc?.[0]?.value || "Unknown";

        if (temp === undefined) {
          result.textContent = "City not found ❌";
          icon.src = "icons/no-result.svg";
          icon.style.display = "inline-block";
          return;
        }

         const formattedCity = city
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");

        result.textContent = `${formattedCity}: ${temp}°C, ${condition}`;
        icon.src = getIcon(condition);
        icon.style.display = "inline-block";
      })
      .catch(() => {
        loader.style.display = "none";
        result.textContent = "No Internet.";
        icon.src = "icons/no-result.svg";
        icon.style.display = "inline-block";
      });
  }

  function getLocalTemperature() {
    const loader = document.getElementById("localLoader");
    const icon = document.getElementById("localIcon");
    const localTemp = document.getElementById("localTemp");

    loader.style.display = "flex";
    icon.style.display = "none";

    fetch("https://wttr.in/?format=j1")
      .then(res => res.json())
      .then(data => {
        loader.style.display = "none";

        const temp = data.current_condition?.[0]?.temp_C;
        const condition = data.current_condition?.[0]?.weatherDesc?.[0]?.value || "Unknown";

        if (temp === undefined) {
          localTemp.textContent = "No Internet.";
          icon.src = "icons/no-result.svg";
          icon.style.display = "inline-block";
          return;
        }

        localTemp.textContent = `${temp}°C, ${condition}`;
        icon.src = getIcon(condition);
        icon.style.display = "inline-block";
      })
      .catch(() => {
        loader.style.display = "none";
        localTemp.textContent = "No Internet.";
        icon.src = "icons/no-result.svg";
        icon.style.display = "inline-block";
      });
  }

  // Fetch local weather on page load
  getLocalTemperature();

