import React, { FC } from 'react';

export type CardBlockProps = {
  title: string;
};

export const CardBlock: FC<CardBlockProps> = ({ title, children }) => (
  <div className="card-block">
    <div className="card-title">{title}</div>
    <div className="card-text">{children}</div>
  </div>
);
