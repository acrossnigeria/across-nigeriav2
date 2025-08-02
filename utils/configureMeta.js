const configureMeta = ({
  title = "Across Nigeria",
  description = "Join the fun with Across Nigeria! Participate in exciting game shows, competitions, and more.",
  keywords = "Across Nigeria, game shows, competitions, skits, ambassador program, Nigerian entertainment",
  image = "/images/frontBanner.JPG",
  url = "https://acrossnig.com"
} = {}) => {
  // ensure DOM is ready
  if (typeof document === "undefined") return;

  document.title = title;

  // define meta tag updates
  const metaData = [
    { selector: "meta[name='description']", attr: "content", value: description },
    { selector: "meta[name='keywords']", attr: "content", value: keywords },
    { selector: "meta[property='og:title']", attr: "content", value: title },
    { selector: "meta[property='og:description']", attr: "content", value: description },
    { selector: "meta[property='og:image']", attr: "content", value: image },
    { selector: "meta[property='og:url']", attr: "content", value: url },
    { selector: "meta[property='og:type']", attr: "content", value: "website" },
    { selector: "meta[name='twitter:title']", attr: "content", value: title },
    { selector: "meta[name='twitter:description']", attr: "content", value: description },
    { selector: "meta[name='twitter:image']", attr: "content", value: image },
    { selector: "meta[name='viewport']", attr: "content", value: "width=device-width, initial-scale=1.0, viewport-fit=cover" },
    { selector: "meta[name='theme-color']", attr: "content", value: "#ffffff" },
    { selector: "link[rel='icon']", attr: "href", value: "/favicon.ico" },
    { selector: "link[rel='apple-touch-icon']", attr: "href", value: "/apple-touch-icon.png" },
    { selector: "link[rel='manifest']", attr: "href", value: "/manifest.json" },
    { selector: "meta[name='mobile-web-app-capable']", attr: "content", value: "yes" },
    { selector: "meta[name='apple-mobile-web-app-capable']", attr: "content", value: "yes" },
    { selector: "meta[name='robots']", attr: "content", value: "index, follow" },
    { selector: "meta[name='author']", attr: "content", value: "Entertainment Methodz" },
    { selector: "link[rel='canonical']", attr: "href", value: url },
    { selector: "meta[name='application-name']", attr: "content", value: "Across Nigeria" },
    { selector: "meta[name='apple-mobile-web-app-title']", attr: "content", value: "Across Nigeria" },
    { selector: "meta[name='msapplication-TileColor']", attr: "content", value: "#ffffff" },
    { selector: "meta[name='msapplication-TileImage']", attr: "content", value: image },
    { selector: "meta[name='google-site-verification']", attr: "content", value: "YOUR_GOOGLE_SITE_VERIFICATION_CODE" },
    { selector: "meta[name='google']", attr: "content", value: "notranslate" }
  ];

  metaData.forEach(({ selector, attr, value }) => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute(attr, value);
    } else {
      console.warn(`Meta/link element not found for selector: ${selector}`);
    }
  });
};

