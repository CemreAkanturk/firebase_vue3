<script setup>
import { computed } from 'vue'
import { getButtonColor } from '@/colors.js'
import Icon from '@/components/Icon.vue'

const props = defineProps({
  label: {
    type: [String, Number],
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  href: {
    type: String,
    default: null
  },
  target: {
    type: String,
    default: null
  },
  to: {
    type: [String, Object],
    default: null
  },
  type: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: 'white'
  },
  as: {
    type: String,
    default: null
  },
  small: Boolean,
  outline: Boolean,
  active: Boolean,
  disabled: Boolean
})

const is = computed(() => {
  if (props.as) {
    return props.as
  }

  if (props.to) {
    return 'router-link'
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})

const computedType = computed(() => {
  if (is.value === 'button') {
    return props.type ?? 'button'
  }

  return null
})

const labelClass = computed(() => props.small && props.icon ? 'px-1' : 'px-2')

const componentClass = computed(() => {
  const base = [
    'inline-flex',
    'cursor-pointer',
    'justify-center',
    'items-center',
    'whitespace-nowrap',
    'focus:outline-none',
    'transition-colors',
    'duration-150',
    'rounded',
    props.active ? 'ring  dark:ring-white' : 'ring-blue-700',
    props.small ? 'p-0' : 'p-1',
    getButtonColor(props.color, props.outline, !props.disabled)
  ]

  if (props.disabled) {
    base.push('cursor-not-allowed', props.outline ? 'opacity-50' : 'opacity-70')
  }

  return base
})
</script>

<template>
  <component
    :is="is"
    :class="componentClass"
    :href="href"
    :type="computedType"
    :to="to"
    :target="target"
    :disabled="disabled"
  >
    <icon
      v-if="icon"
      :path="icon"
    />
    <span
      v-if="label"
      :class="labelClass"
    >{{ label }}</span>
  </component>
</template>
