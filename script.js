// Create a popup class for reusability
class Popup {
  constructor(options = {}) {
    this.options = {
      title: options.title || "Popup Title",
      content: options.content || "Popup Content",
      width: options.width || "300px",
      height: options.height || "auto",
      overlay: options.overlay !== undefined ? options.overlay : true,
      closeButton:
        options.closeButton !== undefined ? options.closeButton : true,
    };

    this.popup = null;
    this.overlay = null;
  }

  create() {
    // Create overlay if enabled
    if (this.options.overlay) {
      this.overlay = document.createElement("div");
      this.overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1000;
            `;
      document.body.appendChild(this.overlay);
    }

    // Create popup
    this.popup = document.createElement("div");
    this.popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            width: ${this.options.width};
            height: ${this.options.height};
        `;

    // Add title
    const title = document.createElement("h2");
    title.style.cssText = "margin: 0 0 10px 0; font-size: 18px;";
    title.textContent = this.options.title;
    this.popup.appendChild(title);

    // Add content
    const content = document.createElement("div");
    content.innerHTML = this.options.content;
    this.popup.appendChild(content);

    // Add close button if enabled
    if (this.options.closeButton) {
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "×";
      closeBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                border: none;
                background: none;
                font-size: 20px;
                cursor: pointer;
                padding: 0 5px;
            `;
      closeBtn.onclick = () => this.close();
      this.popup.appendChild(closeBtn);
    }

    document.body.appendChild(this.popup);
  }

  close() {
    if (this.popup) {
      this.popup.remove();
      this.popup = null;
    }
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  }
}

// Example usage:
const myPopup = new Popup({
  title: "Welcome!",
  content: "<p>This is a custom popup message.</p>",
  width: "400px",
  overlay: true,
  closeButton: true,
});

// Show the popup
myPopup.create();

// To close programmatically:
// myPopup.close();
