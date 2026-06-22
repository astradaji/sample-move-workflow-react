const zipValidationUrl = import.meta.env.VITE_ZIP_VALIDATION_URL;
const smartyKey = import.meta.env.VITE_SMARTY_KEY;

export async function validateUsZip(zip) {
  if (smartyKey) {
    return validateZipWithSmarty(zip);
  }

  if (!zipValidationUrl) {
    return {
      valid: false,
      message: "Smarty key or ZIP validation endpoint is not configured.",
    };
  }

  return validateZipWithServer(zip);
}

async function validateZipWithSmarty(zip) {
  if (smartyKey === "your-smarty-website-key") {
    return {
      valid: false,
      message: "Please add your real Smarty embedded key in .env.",
    };
  }

  const url = new URL("https://us-zipcode.api.smarty.com/lookup");
  url.searchParams.set("key", smartyKey);
  url.searchParams.set("zipcode", zip);

  const response = await fetch(url.toString());

  if (!response.ok) {
    if (response.status === 401) {
      return {
        valid: false,
        message: "Smarty key is invalid or localhost is not authorized for this key.",
      };
    }

    if (response.status === 402) {
      return {
        valid: false,
        message: "Smarty account does not have an active subscription for this API.",
      };
    }

    if (response.status === 429) {
      return {
        valid: false,
        message: "Smarty rate limit reached. Try again later or authorize your IP.",
      };
    }

    return {
      valid: false,
      message: "Could not validate this ZIP with Smarty right now.",
    };
  }

  const data = await response.json();
  const result = Array.isArray(data) ? data[0] : null;
  const cityState = result?.city_states?.[0];

  if (!cityState) {
    return {
      valid: false,
      message: "Please enter a valid U.S. ZIP code.",
    };
  }

  return {
    valid: true,
    city: cityState.city || "",
    state: cityState.state_abbreviation || "",
  };
}

async function validateZipWithServer(zip) {
  const url = new URL(zipValidationUrl);
  url.searchParams.set("zip", zip);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok || data.valid === false) {
    return {
      valid: false,
      message: data.message || "Please enter a valid U.S. ZIP code.",
    };
  }

  return {
    valid: true,
    state: data.state || "",
    city: data.city || "",
  };
}
