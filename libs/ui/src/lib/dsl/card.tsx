import React, { FC, ReactNode } from 'react';

export type CardProps = {
  title: string;
  footerActions?: ReactNode | undefined;
};

export const Card: FC<CardProps> = ({ title, footerActions, children }) => (
  <div className="clr-row">
    <div className="clr-col-lg-5 clr-col-md-8 clr-col-12">
      <div className="card">
        <div className="card-header">{title}</div>
        {children}
        <div className="card-footer">
          <button className="btn btn-sm btn-link">Footer Action 1</button>
          <button className="btn btn-sm btn-link">Footer Action 2</button>
          {footerActions}
        </div>
      </div>
    </div>
  </div>
);
