import type { CartItem } from './cartContext';
import { menu } from '@/data/menu';
import { formatPrice } from '@/lib/format';
import { RESTAURANT_NAME } from '@/lib/contants';

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

/**
 * Groups cart items by category following the menu's own category order
 * (Entradas, Fondos, Postres, Bebidas…), so the WhatsApp message reads in
 * the same order as the carta.
 */
function groupByMenuOrder(items: CartItem[]) {
  return menu
    .map((category) => ({
      title: category.title,
      items: items.filter((item) => item.category === category.title),
    }))
    .filter((category) => category.items.length > 0);
}

export function buildWhatsAppUrl(items: CartItem[], totalPrice: number, deliveryDate: string, phone: string): string {
  const grouped = groupByMenuOrder(items);

  const lines: string[] = [`***Pedido ${RESTAURANT_NAME}***`, ''];

  grouped.forEach((category) => {
    lines.push(`*${category.title}*`);
    category.items.forEach((item) => {
      lines.push(`- ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`);
    });
    lines.push('');
  });

  lines.push(`***Total: ${formatPrice(totalPrice)}***`);
  lines.push('');
  lines.push(`***Fecha de entrega: ${formatDate(deliveryDate)}***`);

  const text = lines.join('\n');
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  console.log(url);
  return url;
}