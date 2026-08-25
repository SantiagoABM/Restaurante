'use client';

import { useState, useEffect } from 'react';
import { Modal, TextInput } from '@mantine/core';
import classes from './DateModal.module.css';

interface DateModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: (isoDate: string) => void;
}

function getTomorrowIso(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function DateModal({ opened, onClose, onConfirm }: DateModalProps) {
  const [minDate, setMinDate] = useState(getTomorrowIso);
  const [date, setDate] = useState(getTomorrowIso);

  useEffect(() => {
    if (opened) {
      const tomorrow = getTomorrowIso();
      setMinDate(tomorrow);
      setDate((prev) => (!prev || prev < tomorrow ? tomorrow : prev));
    }
  }, [opened]);

  const isValid = Boolean(date && date >= minDate);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Escoge la fecha de entrega"
      centered
      radius="lg"
      classNames={{ content: classes.modal, header: classes.header, title: classes.title, body: classes.body }}
    >
      <p className={classes.helper}>¿Para qué día quieres tu pedido?</p>

      <TextInput
        type="date"
        label="Fecha de entrega"
        value={date}
        min={minDate}
        onChange={(event) => setDate(event.currentTarget.value)}
        classNames={{ input: classes.dateInput }}
      />

      <div className={classes.actions}>
        <button type="button" className={classes.cancelBtn} onClick={onClose}>
          Cancelar
        </button>
        <button
          type="button"
          className={classes.confirmBtn}
          disabled={!isValid}
          onClick={() => {
            if (isValid) {
              onConfirm(date);
            }
          }}
        >
          Enviar por WhatsApp
        </button>
      </div>
    </Modal>
  );
}