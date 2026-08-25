import { MenuCategory } from "@/lib/types/menu";
/**
 * Change this array to reuse MenuSection with a different card layout.
 */
 export const menu: MenuCategory[] = [
   {
     title: 'Entradas',
     items: [
      { id: 'anticuchos', name: 'Anticuchos de corazón', description: 'Brasa lenta, ají panca, choclo y papa dorada.', price: 28 },
      { id: 'tiradito-atun', name: 'Tiradito de atún', description: 'Crema de rocoto, aceite de cilantro, sal de maras.', price: 34 },
      { id: 'choritos-chalaca', name: 'Choritos a la chalaca', description: 'Cebolla, tomate, choclo, limón y cancha tostada.', price: 30 },
     ],
   },
   {
     title: 'Fondos',
     items: [
      { id: 'aji-gallina', name: 'Ají de gallina', description: 'Gallina deshilachada en crema de ají amarillo y nuez.', price: 44 },
      { id: 'arroz-mariscos', name: 'Arroz con mariscos', description: 'Arroz al wok con el fondo del día y culantro.', price: 52 },
      { id: 'seco-cordero', name: 'Seco de cordero', description: 'Cordero al culantro con frijoles y arroz.', price: 54 },
     ],
   },
   {
     title: 'Postres',
     items: [
      { id: 'suspiro-limena', name: 'Suspiro a la limeña', description: 'Manjar blanco, merengue al oporto, canela.', price: 20 },
      { id: 'mazamorra-morada', name: 'Mazamorra morada', description: 'Maíz morado, frutas, clavo y canela.', price: 18 },
     ],
   },
   {
     title: 'Bebidas',
     items: [
      { id: 'pisco-sour', name: 'Pisco sour clásico', description: 'Pisco quebranta, limón, clara, amargo de angostura.', price: 26 },
      { id: 'chicha-morada', name: 'Chicha morada', description: 'Maíz morado, piña, membrillo, canela — sin alcohol.', price: 14 },
     ],
   },
 ];
