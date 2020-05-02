<template>
  <div class="wrapper">
    <h2>{{ account.name }}</h2>
    <div class="income">
      <h3>Income:</h3>
      <div>
        <p>Last Month:</p>
        <span>£ {{ account.incomeSumMonth }}</span>
      </div>
      <div>
        <p>Last 30 Days:</p>
        <span>£ {{ account.incomeSum30Days }}</span>
      </div>
      <div>
        <p>All time:</p>
        <span>£ {{ account.incomeSumTotal }}</span>
      </div>
    </div>
    <div class="expenditures">
      <h3>Expenditure:</h3>
      <div>
        <p>Last Month:</p>
        <span>£ {{ account.expenditureSumMonth }}</span>
      </div>
      <div>
        <p>Last 30 Days:</p>
        <span>£ {{ account.expenditureSum30Days }}</span>
      </div>
      <div>
        <p>All time:</p>
        <span>£ {{ account.expenditureSumTotal }}</span>
      </div>
    </div>
    <div class="actions">
      <v-icon name="pencil-alt" scale="0.8" @click="$emit('edit-account', account)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountCard',
  props: ['account'],
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';

@mixin label-and-value {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 0.9rem;
  }

  span {
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--color-danger);
  }
}

.wrapper {
  @include card-with-shadow;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 16px 8px;

  h2 {
    width: 100%;
    text-align: center;
    font-family: var(--font-secondary);
    text-align: center;
    font-size: 1.25rem;
    border-bottom: 1px dotted var(--color-grey-light);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.income,
.expenditures {
  margin-top: 16px;
  flex: 1;
  width: 100%;

  h3 {
    color: var(--color-grey);
    margin-bottom: 8px;
    font-size: 1.125rem;
  }

  & > div {
    @include label-and-value;
    &:not(:last-of-type) {
      margin-bottom: 8px;
    }
  }
}

.income {
  & > div {
    span {
      color: var(--color-success);
    }
  }
}

.actions {
  width: 100%;
  text-align: right;
  margin-top: 16px;
  svg {
    color: var(--color-grey-light);
    transition: 0.2s all ease-in-out;
    &:hover {
      cursor: pointer;
      color: var(--color-grey);
    }
  }
}
</style>
