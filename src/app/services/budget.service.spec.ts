import { TestBed } from '@angular/core/testing';
import { BudgetService } from './budget';
import { IProduct } from '../models/iproduct';

fdescribe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  describe('getWebCost', () => {
    it('debería calcular correctamente el coste web', () => {
      const pages = 5;
      const languages = 2;
      const expected = 5 * 2 * 30; // 300
      expect(service.getWebCost(languages, pages)).toBe(expected);
    });

    it('debería devolver 0 si páginas o idiomas son 0', () => {
      expect(service.getWebCost(0, 5)).toBe(0);
      expect(service.getWebCost(3, 0)).toBe(0);
      expect(service.getWebCost(0, 0)).toBe(0);
    });
  });

  describe('getTotalCost', () => {
    const products: IProduct[] = [
      {
        id: 1,
        name: 'Seo',
        description: 'Optimización en motores de búsqueda',
        price: 300
      },
      {
        id: 2,
        name: 'Hosting',
        description: 'Alojamiento web anual',
        price: 200
      },
      {
        id: 3,
        name: 'Página web',
        description: 'Programación de una web responsive completa',
        price: 500
      }
    ];

    it('debería calcular el coste total sin coste web extra', () => {
      const selected = [1, 2];
      const expected = 300 + 200;
      expect(service.getTotalCost(products, selected)).toBe(expected);
    });

    it('debería incluir el coste web extra si se pasa como argumento', () => {
      const selected = [1, 3];
      const webCost = 300;
      const expected = 300 + 500 + 300;
      expect(service.getTotalCost(products, selected, webCost)).toBe(expected);
    });

    it('debería devolver solo el coste web si no hay productos seleccionados', () => {
      const selected: number[] = [];
      const webCost = 90;
      expect(service.getTotalCost(products, selected, webCost)).toBe(webCost);
    });

    it('debería devolver 0 si no hay productos ni coste web', () => {
      expect(service.getTotalCost([], [], 0)).toBe(0);
    });
  });
});
