/*
 Import all product specific js
 */
import PageManager from "./page-manager";
import Review from "./product/reviews";
import collapsibleFactory from "./common/collapsible";
import ProductDetails from "./common/product-details";
import videoGallery from "./product/video-gallery";
import { classifyForm } from "./common/utils/form-utils";
import modalFactory from "./global/modal";

export default class Product extends PageManager {
  constructor(context) {
    super(context);
    this.url = window.location.href;
    this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    this.reviewModal = modalFactory("#modal-review-form")[0];
    this.storefrontToken = context.storefrontToken;
  }

  onReady() {
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on("close.fndtn.reveal", () => {
      if (
        this.url.indexOf("#write_review") !== -1 &&
        typeof window.history.replaceState === "function"
      ) {
        window.history.replaceState(
          null,
          document.title,
          window.location.pathname
        );
      }
    });

    let validator;

    // Init collapsible
    collapsibleFactory();

    this.productDetails = new ProductDetails(
      $(".productView"),
      this.context,
      window.BCData.product_attributes
    );
    this.productDetails.setProductVariant();

    videoGallery();

    this.bulkPricingHandler();

    const $reviewForm = classifyForm(".writeReview-form");

    if ($reviewForm.length === 0) return;

    const review = new Review({ $reviewForm });

    $("body").on("click", '[data-reveal-id="modal-review-form"]', () => {
      validator = review.registerValidation(this.context);
      this.ariaDescribeReviewInputs($reviewForm);
    });

    $reviewForm.on("submit", () => {
      if (validator) {
        validator.performCheck();
        return validator.areAll("valid");
      }

      return false;
    });

    this.productReviewHandler();

    // GET STORE LOCATION DATA FOR STORES

    const locationQuery = `query {
        inventory {
            locations {
            edges {
                node {
                entityId
                code
                label
                description
                typeId
                timeZone
                address {
                    city
                    address1
                    address2
                    postalCode
                    stateOrProvince
                    email
                    phone
                    latitude
                    longitude
                    countryCode
                }
                operatingHours {
                    sunday {
                    open
                    opening
                    closing
                    }
                    monday {
                    open
                    opening
                    closing
                    }
                    tuesday {
                    open
                    opening
                    closing
                    }
                    wednesday {
                    open
                    opening
                    closing
                    }
                    thursday {
                    open
                    opening
                    closing
                    }
                    friday {
                    open
                    opening
                    closing
                    }
                    saturday {
                    open
                    opening
                    closing
                    }
                }
                specialHours {
                    label
                    open
                    opening
                    closing
                }
                }
            }
            }
        }
        }
        `;
    fetch(`/graphql`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.storefrontToken}`,
      },

      body: JSON.stringify({
        query: locationQuery,
      }),
    })
      .then((res) => res.json())
      .then(
        ({
          data: {
            inventory: {
              locations: { edges: locations },
            },
          },
        }) => {
          console.log("LOCATIONS -----> ", locations);
          const pickUpLocatinSelect =
            document.getElementById("po-location-select");
          const reducedInPersonStores = locations.reduce((accum, { node }) => {
            if (!node.address.city) return accum;
            return (
              accum +
              `
              <option data-id=${node.entityId}>
              ${
                node.label +
                " | " +
                node.address.address1 +
                " " +
                node.address.city +
                ", " +
                node.address.stateOrProvince
              }
              </option>
            `
            );
          }, "<option autofocus selected disabled>Please select a pickup location</option>");
          pickUpLocatinSelect.innerHTML = reducedInPersonStores;
          pickUpLocatinSelect.addEventListener("change", (e) => {
            localStorage.setItem("PICKUP_LOCATION", e.target.value);
            localStorage.setItem("PICKUP_LOCATION_ID", e.target.options[e.target.options.selectedIndex].dataset.id);
          });
        }
      );

    // END onReady function
  }

  ariaDescribeReviewInputs($form) {
    $form.find("[data-input]").each((_, input) => {
      const $input = $(input);
      const msgSpanId = `${$input.attr("name")}-msg`;

      $input.siblings("span").attr("id", msgSpanId);
      $input.attr("aria-describedby", msgSpanId);
    });
  }

  productReviewHandler() {
    if (this.url.indexOf("#write_review") !== -1) {
      this.$reviewLink.trigger("click");
    }
  }

  bulkPricingHandler() {
    if (this.url.indexOf("#bulk_pricing") !== -1) {
      this.$bulkPricingLink.trigger("click");
    }
  }
}
