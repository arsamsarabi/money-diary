<template>
  <div class="wrapper">
    <h2>{{ account.name }}</h2>
    <div class="income">
      <p>Income:</p>
      <span>£ 5,000</span>
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
      <v-icon name="pencil-alt" scale="0.8" />
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
    font-size: 0.8rem;
  }

  span {
    font-size: 0.8rem;
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
  width: 200px;
  height: 250px;
  padding: 16px 16px 8px;

  h2 {
    width: 100%;
    text-align: center;
    font-family: var(--font-secondary);
    text-align: center;
    font-size: 1.25rem;
    border-bottom: 1px dotted var(--color-grey-light);
  }
}

.income {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  p {
    color: var(--color-grey);
    font-size: 0.9rem;
  }
  span {
    color: var(--color-success);
    font-weight: bold;
    font-size: 0.9rem;
  }
}

.expenditures {
  margin-top: 16px;
  flex: 1;
  width: 100%;

  h3 {
    color: var(--color-grey);
    margin-bottom: 8px;
    font-size: 0.9rem;
  }

  & > div {
    @include label-and-value;
    &:not(:last-of-type) {
      margin-bottom: 8px;
    }
  }
}

.actions {
  width: 100%;
  text-align: right;
  svg {
    color: var(--color-grey-light);
  }
}
</style>
