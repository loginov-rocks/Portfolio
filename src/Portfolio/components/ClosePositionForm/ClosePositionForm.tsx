import * as React from 'react';

export interface Props {
  commission: number;
  date: string;
  handleCommissionChange: (event: React.SyntheticEvent) => void;
  handleDateChange: (event: React.SyntheticEvent) => void;
  handlePriceChange: (event: React.SyntheticEvent) => void;
  handleSubmit: (event: React.SyntheticEvent) => void;
  price: number;
}

const ClosePositionForm: React.FunctionComponent<Props> = ({
  commission, date, handleCommissionChange, handleDateChange, handlePriceChange, handleSubmit, price,
}: Props) => (
  <form onSubmit={handleSubmit}>

    <div>
      Price
      <br />
      <input
        min="0"
        onChange={handlePriceChange}
        step="0.01"
        type="number"
        value={price}
      />
    </div>

    <div>
      Commission
      <br />
      <input
        min="0"
        onChange={handleCommissionChange}
        step="0.01"
        type="number"
        value={commission}
      />
    </div>

    <div>
      Date
      <br />
      <input onChange={handleDateChange} type="date" value={date} />
    </div>

    <div>
      <button type="submit">Close</button>
    </div>

  </form>
);

export default ClosePositionForm;
