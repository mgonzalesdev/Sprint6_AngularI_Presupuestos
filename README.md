# 🧾 Presupuesto Web App

Aplicación desarrollada en **Angular 20** que permite crear presupuestos dinámicos para distintos productos, incluyendo un módulo para calcular el coste de una página web basado en el número de páginas e idiomas.  
La app soporta **sincronización de datos con la URL**, para que los presupuestos se puedan compartir fácilmente.

---

## 🚀 Tecnologías utilizadas

- **Angular 20** (Standalone Components, Signals, Computed, Reactive Forms)
- **Angular Material** (Inputs, Botones, Diálogos, Cards, Checkboxes)
- **TypeScript** para tipado estricto
- **Routing con Query Params** para compartir datos por URL
- **Arquitectura modular** con componentes reutilizables

---

## 📂 Estructura del proyecto
```text
src/app
├───components
│   ├───budgets-list/ # Lista de presupuestos guardados
│   ├───help-dialog/ # Diálogo de ayuda con Angular Material
│   ├───home/
│   ├───panel/ # Componente de configuración de páginas/idiomas
│   └───product/ # Componente para mostrar productos
├───models
│       ibudget.ts # Interface de presupuesto
│       iproduct.ts # Interface de producto
│
├───pages
│   ├───budgets/# Página de presupuesto con formulario y productos
│   └───welcome/# Página principal de bienvenida
└───services
        budget.service.spec.ts
        budget.ts # Servicio de presupuestos
        products.spec.ts
        products.ts # Servicio de productos
```   
---

## ⚙️ Funcionalidades principales

1. **Selección de productos** con checkboxes.
2. **Cálculo dinámico** del coste total.
3. **Módulo especial** para páginas web:  
   - Número de páginas  
   - Número de idiomas  
   - Coste adicional automático  
4. **Formulario de cliente** con validaciones reactivas.  
5. **Guardado de presupuestos** en memoria usando un servicio.  
6. **Sincronización con la URL** para compartir presupuestos:
   - `products`, `pages`, `languages`, se reflejan en la URL.
7. **Soporte para Angular Material**:  
   - Inputs, botones, diálogos y cards con diseño moderno.  

---

## 🖼️ Vista general del flujo

1. El usuario selecciona productos en **Product**.  
2. Si selecciona *Página Web*, se muestra el **Panel** para configurar páginas e idiomas.  
3. La URL se actualiza automáticamente con los datos (`queryParams`).  
4. Si alguien comparte esa URL, al abrirla se cargan los valores iniciales en el **Home** y el **Panel**.

---

## ⚡ Instalación y Ejecución

Sigue estos pasos para poner en ejecución la aplicación en tu entorno local:

### 1️⃣ Prerrequisitos
Asegúrate de tener instalados:
- [Node.js](https://nodejs.org/) (v18 o superior)
- [Angular CLI](https://angular.dev/tools/cli) (v20 o superior)
- NPM (v9 o superior)

### 🛠️ Clona el repositorio:
   ```bash
   git clone https://github.com/mgonzalesdev/Sprint6_AngularI_Presupuestos.git
   cd budget_app
   npm install
```

### ▶️ Ejecución

Inicia el servidor de desarrollo con:

```bash
ng serve
```

Abre el navegador en:

```
http://localhost:4200
```