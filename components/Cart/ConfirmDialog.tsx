'use client';

import { Modal } from '@mantine/core';
import classes from './ConfirmDialog.module.css';

interface ConfirmDialogProps {
  opened: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  opened,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal
      opened={opened}
      onClose={onCancel}
      title={title}
      centered
      radius="lg"
      classNames={{
        content: classes.modal,
        header: classes.header,
        title: classes.title,
        body: classes.body,
      }}
    >
      <p className={classes.message}>{message}</p>
      <div className={classes.actions}>
        <button type="button" className={classes.cancelBtn} onClick={onCancel}>
          {cancelLabel}
        </button>
        <button type="button" className={classes.confirmBtn} onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}