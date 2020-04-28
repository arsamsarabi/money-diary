<template>
  <label class="toggle">
    <input class="toggle__input" type="checkbox" :checked="checked" @change="handleChange" :disabled="disabled" />
    <span class="toggle__label">
      <span class="toggle__text">{{ label }}</span>
    </span>
  </label>
</template>

<script>
export default {
  name: 'FancyCheckbox',
  data() {
    return {
      checked: false,
    }
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChange() {
      this.checked = !this.checked
      this.$emit('on-change', this.checked)
    },
  },
}
</script>

<style lang="scss" scoped>
.toggle {
  --uiToggleSize: 25px;
  --uiToggleColor: var(--color-primary);
  display: inline-block;
  position: relative;
}

.toggle__input {
  position: absolute;
  left: -99999px;

  &:not(:disabled) {
    &:checked {
      & ~ .toggle__label {
        &:after {
          opacity: 1;
        }
      }
    }

    & ~ .toggle__label {
      cursor: pointer;
      &:after {
        background-color: var(--uiToggleColor);
        opacity: 0;
      }
    }
  }

  &:disabled {
    & ~ .toggle__label {
      &:before {
        border-color: var(--color-grey-xlight);
      }
    }
    & ~ .toggle__label {
      opacity: 0.24;
      cursor: not-allowed;
    }
  }
}

.toggle__label {
  display: inline-flex;
  min-height: var(--uiToggleSize);
  padding-left: calc(var(--uiToggleSize) + 8px);

  &:before,
  &:after {
    content: '';
    box-sizing: border-box;
    width: 1em;
    height: 1em;
    font-size: var(--uiToggleSize);
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: 0;
  }
  &:before {
    border: 2px solid var(--uiToggleColor);
    z-index: 2;
  }
}

.toggle__text {
  margin-top: auto;
  margin-bottom: auto;

  &:before {
    content: '';
    box-sizing: border-box;
    width: 0;
    height: 0;
    font-size: var(--uiToggleSize);
    opacity: 0;
    border-left-width: 0;
    border-bottom-width: 0;
    border-left-style: solid;
    border-bottom-style: solid;
    border-color: var(--color-white);
    position: absolute;
    top: 0.5428em;
    left: 0.2em;
    z-index: 3;
    transform-origin: left top;
    transform: rotate(-40deg) skew(10deg);
  }
}

.toggle__input:not(:disabled):checked ~ .toggle__label .toggle__text::before {
  width: 0.5em;
  height: 0.25em;
  border-left-width: 2px;
  border-bottom-width: 2px;
  will-change: width, height;
  transition: width 0.1s ease-out 0.2s, height 0.2s ease-out;
}

.toggle__input:not(:disabled) ~ .toggle__label::before,
.toggle__input:not(:disabled) ~ .toggle__label::after {
  opacity: 1;
  transform-origin: center center;
  will-change: transform;
  transition: transform 0.2s ease-out;
}

.toggle__input:not(:disabled) ~ .toggle__label::before {
  transform: rotateY(0deg);
  transition-delay: 0.2s;
}

.toggle__input:not(:disabled) ~ .toggle__label::after {
  transform: rotateY(90deg);
}

.toggle__input:not(:disabled):checked ~ .toggle__label::before {
  transform: rotateY(-90deg);
  transition-delay: 0s;
}

.toggle__input:not(:disabled):checked ~ .toggle__label::after {
  transform: rotateY(0deg);
  transition-delay: 0.2s;
}

.toggle__input:not(:disabled):checked ~ .toggle__label .toggle__text::before {
  opacity: 1;
  transition: opacity 0.1s ease-out 0.3s, width 0.1s ease-out 0.5s, height 0.2s ease-out 0.3s;
}
</style>
