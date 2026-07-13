(() => {
  "use strict";

  const SELECTORS = {
    section: ".gift-guide",
    trigger: "[data-product-trigger]",
    modal: "[data-product-modal]",
    close: "[data-modal-close]",
    form: "[data-product-form]",
    optionGroup: "[data-product-option]",
    optionInput: "[data-option-input]",
    variantsJson: "[data-product-variants]",
    variantId: "[data-variant-id]",
    price: "[data-modal-price]",
    image: "[data-modal-image]",
    addButton: "[data-add-to-cart]",
    addLabel: "[data-add-label]",
    dropdown: "[data-custom-dropdown]",
    dropdownTrigger: "[data-dropdown-trigger]",
    dropdownMenu: "[data-dropdown-menu]",
    dropdownOption: "[data-dropdown-option]",
    dropdownLabel: "[data-dropdown-label]",
    dropdownInput: "[data-dropdown-input]",
  };

  const LABELS = {
    add: "Add to cart",
    adding: "Adding...",
    added: "Added to cart",
    soldOut: "Sold out",
    unavailable: "Unavailable",
    chooseOptions: "Add to cart",
    error: "Try again",
  };

  class GiftGuide {
    constructor(section) {
      this.section = section;
      this.activeModal = null;
      this.lastTrigger = null;

      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);

      this.bindEvents();
    }

    bindEvents() {
      /*Event delegation keeps the section lightweight and avoids
       * attaching separate listeners to every product and option.
       */

      this.section.addEventListener("click", this.handleClick);
      this.section.addEventListener("change", this.handleChange);
      this.section.addEventListener("submit", this.handleSubmit);
      document.addEventListener("keydown", this.handleKeydown);

      this.section.addEventListener(
        "pointerover",
        this.handleDropdownPointerOver.bind(this),
      );

      this.section.addEventListener(
        "pointerleave",
        this.handleDropdownPointerLeave.bind(this),
        true,
      );
    }

    handleClick(event) {
      const productTrigger = event.target.closest(SELECTORS.trigger);

      if (productTrigger && this.section.contains(productTrigger)) {
        this.openModal(productTrigger);
        return;
      }

      const dropdownOption = event.target.closest(SELECTORS.dropdownOption);

      if (dropdownOption) {
        const dropdown = dropdownOption.closest(SELECTORS.dropdown);

        if (dropdown) {
          this.selectDropdownOption(dropdown, dropdownOption);
        }

        return;
      }

      const dropdownTrigger = event.target.closest(SELECTORS.dropdownTrigger);

      if (dropdownTrigger) {
        const dropdown = dropdownTrigger.closest(SELECTORS.dropdown);

        if (dropdown) {
          this.toggleDropdown(dropdown);
        }

        return;
      }

      const closeButton = event.target.closest(SELECTORS.close);

      if (closeButton) {
        const modal = closeButton.closest(SELECTORS.modal);
        this.closeModal(modal);
        return;
      }

      if (!event.target.closest(SELECTORS.dropdown)) {
        this.closeAllDropdowns();
      }

      const modal = event.target.closest(SELECTORS.modal);

      if (modal && event.target === modal) {
        this.closeModal(modal);
      }
    }

    handleChange(event) {
      const optionInput = event.target.closest(SELECTORS.optionInput);

      if (!optionInput) return;

      const modal = optionInput.closest(SELECTORS.modal);

      if (!modal) return;

      if (
        optionInput.matches('.gift-guide-modal__swatch-input[type="radio"]')
      ) {
        this.updateColorIndicator(optionInput);
      }

      this.updateSelectedVariant(modal);
    }

    handleSubmit(event) {
      const form = event.target.closest(SELECTORS.form);

      if (!form) return;

      event.preventDefault();
      this.addToCart(form);
    }

    handleKeydown(event) {
      if (event.key !== "Escape" || !this.activeModal) return;

      event.preventDefault();
      this.closeModal(this.activeModal);
    }

    openModal(trigger) {
      const targetId = trigger.dataset.modalTarget;

      if (!targetId) return;

      const modal = document.getElementById(targetId);

      if (!(modal instanceof HTMLDialogElement)) {
        console.error(`Gift Guide modal not found: ${targetId}`);
        return;
      }

      this.lastTrigger = trigger;
      this.activeModal = modal;

      if (!modal.open) {
        modal.showModal();

        modal
          .querySelectorAll(
            '.gift-guide-modal__swatch-input[type="radio"]:checked',
          )
          .forEach((input) => {
            this.updateColorIndicator(input);
          });
      }

      // Size starts intentionally unselected, so validate the full option set
      // before enabling Add to Cart.
      this.updateSelectedVariant(modal);

      document.documentElement.classList.add("gift-guide-modal-open");

      const closeButton = modal.querySelector(SELECTORS.close);
      closeButton?.focus();
    }

    closeModal(modal) {
      if (!(modal instanceof HTMLDialogElement)) return;

      this.closeAllDropdowns();

      if (modal.open) {
        modal.close();
      }

      document.documentElement.classList.remove("gift-guide-modal-open");

      this.activeModal = null;
      this.lastTrigger?.focus();
      this.lastTrigger = null;
    }

    toggleDropdown(dropdown) {
      const trigger = dropdown.querySelector(SELECTORS.dropdownTrigger);

      const menu = dropdown.querySelector(SELECTORS.dropdownMenu);

      if (!trigger || !menu) return;

      const isOpen = dropdown.classList.contains("is-open");

      this.closeAllDropdowns(dropdown);

      dropdown.classList.toggle("is-open", !isOpen);
      trigger.setAttribute("aria-expanded", String(!isOpen));
      menu.hidden = isOpen;

      if (!isOpen) {
        const selectedOption = dropdown.querySelector(
          `${SELECTORS.dropdownOption}[aria-selected="true"]`,
        );

        if (selectedOption) {
          this.highlightDropdownOption(menu, selectedOption);
        } else {
          this.clearDropdownHighlight(menu);
        }
      }
    }

    selectDropdownOption(dropdown, option) {
      const trigger = dropdown.querySelector(SELECTORS.dropdownTrigger);

      const menu = dropdown.querySelector(SELECTORS.dropdownMenu);

      const label = dropdown.querySelector(SELECTORS.dropdownLabel);

      const input = dropdown.querySelector(SELECTORS.dropdownInput);

      const value = option.dataset.value || option.textContent.trim();

      const menuOptions = [
        ...dropdown.querySelectorAll(SELECTORS.dropdownOption),
      ];

      menuOptions.forEach((item) => {
        const isSelected = item === option;

        item.setAttribute("aria-selected", String(isSelected));

        item.classList.toggle("is-highlighted", isSelected);
      });

      if (label) {
        label.textContent = value;
      }

      if (input) {
        input.value = value;

        input.dispatchEvent(
          new Event("change", {
            bubbles: true,
          }),
        );
      }

      if (menu) {
        const selectedIndex = menuOptions.indexOf(option);

        menu.style.setProperty(
          "--dropdown-active-index",
          String(selectedIndex),
        );

        menu.hidden = true;
      }

      dropdown.classList.remove("is-open");

      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");

        trigger.focus();
      }
    }

    closeAllDropdowns(exceptDropdown = null) {
      this.section.querySelectorAll(SELECTORS.dropdown).forEach((dropdown) => {
        if (dropdown === exceptDropdown) return;

        dropdown.classList.remove("is-open");

        const trigger = dropdown.querySelector(SELECTORS.dropdownTrigger);

        const menu = dropdown.querySelector(SELECTORS.dropdownMenu);

        trigger?.setAttribute("aria-expanded", "false");

        if (menu) {
          menu.hidden = true;
        }
      });
    }

    handleDropdownPointerOver(event) {
      const option = event.target.closest(SELECTORS.dropdownOption);

      if (!option) return;

      const menu = option.closest(SELECTORS.dropdownMenu);

      if (!menu) return;

      this.highlightDropdownOption(menu, option);
    }

    handleDropdownPointerLeave(event) {
      const menu = event.target.closest?.(SELECTORS.dropdownMenu);

      if (!menu) return;

      const selectedOption = menu.querySelector(
        `${SELECTORS.dropdownOption}[aria-selected="true"]`,
      );

      if (selectedOption) {
        this.highlightDropdownOption(menu, selectedOption);
      } else {
        this.clearDropdownHighlight(menu);
      }
    }

    highlightDropdownOption(menu, option) {
      const options = [...menu.querySelectorAll(SELECTORS.dropdownOption)];

      const index = options.indexOf(option);

      if (index < 0) return;

      options.forEach((item) => {
        item.classList.toggle("is-highlighted", item === option);
      });

      menu.style.setProperty("--dropdown-active-index", String(index));
    }

    clearDropdownHighlight(menu) {
      menu.querySelectorAll(SELECTORS.dropdownOption).forEach((option) => {
        option.classList.remove("is-highlighted");
      });

      menu.style.setProperty("--dropdown-active-index", "-1");
    }

    updateColorIndicator(selectedInput) {
      const swatches = selectedInput.closest(".gift-guide-modal__swatches");

      if (!swatches) return;

      const inputs = [
        ...swatches.querySelectorAll(".gift-guide-modal__swatch-input"),
      ];

      const selectedIndex = inputs.indexOf(selectedInput);

      if (selectedIndex < 0) return;

      swatches.style.setProperty(
        "--selected-color-index",
        String(selectedIndex),
      );
    }

    getVariants(modal) {
      const jsonElement = modal.querySelector(SELECTORS.variantsJson);

      if (!jsonElement) return [];

      try {
        return JSON.parse(jsonElement.textContent);
      } catch (error) {
        console.error("Unable to parse product variants", error);
        return [];
      }
    }

    getSelectedOptions(modal) {
      const optionGroups = [...modal.querySelectorAll(SELECTORS.optionGroup)];

      return optionGroups
        .sort(
          (first, second) =>
            Number(first.dataset.optionPosition) -
            Number(second.dataset.optionPosition),
        )
        .map((group) => {
          const checkedRadio = group.querySelector(
            'input[type="radio"][data-option-input]:checked',
          );

          if (checkedRadio) {
            return checkedRadio.value;
          }

          const customDropdownInput = group.querySelector(
            SELECTORS.dropdownInput,
          );

          if (customDropdownInput) {
            return customDropdownInput.value || "";
          }

          const select = group.querySelector("select[data-option-input]");

          return select?.value || "";
        });
    }

    updateSelectedVariant(modal) {
      const variants = this.getVariants(modal);
      const selectedOptions = this.getSelectedOptions(modal);

      /*
       * Shopify variant JSON contains option1, option2, option3.
       * The selected values are compared in their original order.
       */
      const selectedVariant = variants.find((variant) =>
        selectedOptions.every(
          (selectedValue, index) =>
            variant[`option${index + 1}`] === selectedValue,
        ),
      );

      this.renderVariant(modal, selectedVariant);
    }

    renderVariant(modal, variant) {
      const variantInput = modal.querySelector(SELECTORS.variantId);
      const priceElement = modal.querySelector(SELECTORS.price);
      const imageElement = modal.querySelector(SELECTORS.image);
      const addButton = modal.querySelector(SELECTORS.addButton);
      const addLabel = modal.querySelector(SELECTORS.addLabel);

      if (!variant) {
        if (variantInput) variantInput.value = "";
        if (addButton) addButton.disabled = true;
        if (addLabel) addLabel.textContent = LABELS.chooseOptions;
        return;
      }

      if (variantInput) {
        variantInput.value = String(variant.id);
      }

      if (priceElement) {
        priceElement.textContent = this.formatMoney(variant.price);
      }

      if (imageElement && variant.featured_image?.src) {
        imageElement.src = this.resizeShopifyImage(
          variant.featured_image.src,
          700,
        );

        imageElement.removeAttribute("srcset");

        imageElement.alt =
          variant.featured_image.alt || variant.name || "Product image";
      }

      if (addButton) {
        addButton.disabled = !variant.available;
      }

      if (addLabel) {
        addLabel.textContent = variant.available ? LABELS.add : LABELS.soldOut;
      }
    }

    formatMoney(amountInCents) {
      /*
       * Shopify's variant JSON exposes prices in the store's
       * minor currency unit. This uses the document locale and
       * Shopify currency exposed by Dawn.
       */

      const currency =
        window.Shopify?.currency?.active ||
        document.documentElement.dataset.currency ||
        "USD";
      try {
        return new Intl.NumberFormat(document.documentElement.lang || "en", {
          style: "currency",
          currency,
        }).format(Number(amountInCents) / 100);
      } catch {
        return `${(Number(amountInCents) / 100).toFixed(2)} ${currency}`;
      }
    }

    resizeShopifyImage(url, width) {
      if (!url) return "";

      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}width=${width}`;
    }

    async addToCart(form) {
      const variantInput = form.querySelector(SELECTORS.variantId);
      const addButton = form.querySelector(SELECTORS.addButton);
      const addLabel = form.querySelector(SELECTORS.addLabel);
      const modal = form.closest(SELECTORS.modal);

      const variantId = Number(variantInput?.value);

      if (!variantId || !addButton || !addLabel || !modal) {
        return;
      }

      const selectedOptions = this.getSelectedOptions(modal).map((value) =>
        String(value).trim().toLowerCase(),
      );

      const hasBlack = selectedOptions.includes("black");
      const hasMedium =
        selectedOptions.includes("medium") || selectedOptions.includes("m");

      const bonusVariantId = Number(form.dataset.bonusVariantId);

      const items = [
        {
          id: variantId,
          quantity: 1,
        },
      ];

      if (hasBlack && hasMedium && bonusVariantId) {
        items.push({
          id: bonusVariantId,
          quantity: 1,
        });
      }

      const originalLabel = addLabel.textContent;

      addButton.disabled = true;

      addButton.setAttribute("aria-busy", "true");

      addButton.classList.remove("is-added", "is-error");

      addButton.classList.add("is-loading");

      addLabel.textContent = LABELS.adding;

      try {
        const root = window.Shopify?.routes?.root || "/";

        const response = await fetch(`${root}cart/add.js`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ items }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.description ||
              result.message ||
              "Unable to add this product to the cart.",
          );
        }

        addButton.classList.remove("is-loading");

        addButton.classList.add("is-added");

        addButton.classList.remove("is-loading");
        addButton.classList.add("is-added");
        addLabel.textContent = "Added to cart ✓";

        await this.updateCartCount();

        document.dispatchEvent(
          new CustomEvent("gift-guide:cart-added", {
            bubbles: true,
            detail: {
              variantId,
              bonusVariantId:
                hasBlack && hasMedium && bonusVariantId ? bonusVariantId : null,
              response: result,
            },
          }),
        );

        window.setTimeout(() => {
          addButton.classList.remove("is-added");
          addButton.removeAttribute("aria-busy");
          this.updateSelectedVariant(modal);
        }, 2600);
      } catch (error) {
        console.error("Gift guide add-to-cart failed", error);

        addButton.classList.remove("is-loading");
        addButton.classList.add("is-error");
        addLabel.textContent = LABELS.error;

        window.setTimeout(() => {
          addButton.classList.remove("is-error");
          addButton.removeAttribute("aria-busy");
          this.updateSelectedVariant(modal);
        }, 2200);
      }
    }

    async updateCartCount() {
      try {
        const root = window.Shopify?.routes?.root || "/";

        const response = await fetch(`${root}cart.js`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) return;

        const cart = await response.json();

        const countBubble = document.querySelector(
          "#cart-icon-bubble .cart-count-bubble",
        );

        if (countBubble) {
          const numberElement =
            countBubble.querySelector("span[aria-hidden='true']") ||
            countBubble.querySelector("span");

          if (numberElement) {
            numberElement.textContent = String(cart.item_count);
          }

          countBubble.classList.toggle("hidden", cart.item_count === 0);
        }
      } catch (error) {
        /*
         * The product was already added successfully, so as cart-count
         * rendering failure should not be shown as an add-to-cart error.
         */
        console.warn("Unable to refresh cart count.", error);
      }
    }
  }

  const initializeGiftGuides = () => {
    document.querySelectorAll(SELECTORS.section).forEach((section) => {
      if (section.dataset.giftGuideInitialized === "true") return;

      section.dataset.giftGuideInitialized = "true";
      new GiftGuide(section);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeGiftGuides, {
      once: true,
    });
  } else {
    initializeGiftGuides();
  }

  /*
   * Shopify Theme Editor can dynamically reload sections without
   * performing a full page reload.
   */
  document.addEventListener("shopify:section:load", initializeGiftGuides);
})();
