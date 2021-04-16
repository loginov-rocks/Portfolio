import {
  connect, InferableComponentEnhancerWithProps, MapDispatchToProps, ResolveThunks,
} from 'react-redux';

import State from 'State';

import {
  changeSorterKeyCurried, ChangeSorterKeyAction, changeSorterOrderCurried, ChangeSorterOrderAction,
} from 'Layers/Application/ActionCreators/HomeActionCreators/HomeActionCreators';

// TODO: Tests.

interface StateProps {
  sorterKey: string;
  sorterOrder: 'asc' | 'desc';
}

interface DispatchProps {
  handleSorterKeyChange: ChangeSorterKeyAction;
  handleSorterOrderChange: ChangeSorterOrderAction;
}

export interface Props extends StateProps, DispatchProps {
  // Export one interface for ease of use.
}

const mapStateToProps = (name: string, initialKey: string, initialOrder: 'asc' | 'desc') => ({
  home: { sorters: { [name]: sorter } },
}: State): StateProps => {
  let sorterKey = initialKey;
  let sorterOrder = initialOrder;

  if (sorter) {
    if (sorter.key) {
      sorterKey = sorter.key;
    }

    if (sorter.order) {
      sorterOrder = sorter.order;
    }
  }

  return { sorterKey, sorterOrder };
};

const mapDispatchToProps = (name: string): MapDispatchToProps<DispatchProps, Record<string, never>> => ({
  handleSorterKeyChange: changeSorterKeyCurried(name),
  handleSorterOrderChange: changeSorterOrderCurried(name),
});

export default (
  name: string,
  initialKey: string,
  initialOrder: 'asc' | 'desc',
): InferableComponentEnhancerWithProps<StateProps & ResolveThunks<DispatchProps>, Record<string, never>> => (
  connect(mapStateToProps(name, initialKey, initialOrder), mapDispatchToProps(name))
);
