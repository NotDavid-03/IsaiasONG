# Casa Isaías ONG — «Tú eres mi Inspiración» 💙❤️💛

Sitio web oficial y plataforma digital interactiva para la organización sin fines de lucro **Casa Isaías**, diseñada para captación de donaciones, gestión de voluntariado, agenda comunitaria y rendición de cuentas transparente.

Desarrollada con **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, y preparada para desplegarse en **Vercel** y conectarse a **Supabase**.

---

## 🎨 Identidad Visual y Colores de Marca

La paleta cromática se basa en el imagotipo de **Casa Isaías**, cuyas tres figuras humanas abrazadas representan la unión entre niños, voluntarios y donantes:

- 🔵 **Azul Celeste (#00AEEF)**: Esperanza, educación, futuro y pensamiento libre.
- 🔴 **Rojo Pasión (#EF4444)**: Amor al prójimo, salud física y sanación emocional.
- 🟡 **Amarillo Cálido (#F59E0B)**: Nutrición, el pan diario, alegría comunitaria y nuevos comienzos.
- ⚫ **Carbón Elegante (#111827)**: Solidez institucional y legibilidad.

---

## 🚀 Características Principales

1. **Centro de Donaciones Interactivo:**
   - Donaciones puntuales o suscripción como **Padrino de Inspiración** (recurrente mensual).
   - Montos predefinidos ($10, $25, $50, $100) con calculadora de impacto real en tiempo real.
   - Destino seleccionable (Fondo general, Nutrición, Educación, Salud).
   - Métodos: Tarjeta, Transferencia Bancaria Directa (con números de cuenta y copiado rápido) y PayPal.
   - Celebración visual con confeti y generación de comprobante.

2. **Agenda de Actividades y Eventos:**
   - Filtros por categoría: Nutrición, Educación, Salud y Médicas, Comunitarias.
   - Pestañas entre **Próximas Jornadas** y **Jornadas Concluidas**.
   - Barra de progreso de cupos de voluntariado en tiempo real.
   - Botón directo para inscribirse en la actividad o donar para sus insumos.

3. **Portal de Voluntariado:**
   - Formulario de registro por áreas de interés (Refuerzo escolar, Cocina, Salud, Logística, Fotografía) y disponibilidad horaria.

4. **Quiénes Somos y Simbolismo:**
   - Historia y significado del lema *«Tú eres mi Inspiración»*.
   - Misión, Visión y Valores institucionales.

5. **Transparencia y Cuentas Claras:**
   - Gráfico de distribución de fondos (85% programas directos, 10% operaciones, 5% recaudación).
   - Acceso a memorias anuales y certificados legales.

6. **Métricas de Impacto:**
   - Contadores en vivo (+1,250 vidas apoyadas, +48,000 raciones entregadas, +85 voluntarios).

7. **Contacto y WhatsApp Flotante:**
   - Formulario de contacto directo y botón flotante de WhatsApp siempre visible.

---

## 🛠️ Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS con fuentes optimizadas de Google (Outfit & Inter)
- **Iconografía**: Lucide React
- **Efectos**: Canvas-Confetti
- **Base de Datos / Backend**: Supabase (con fallback automático a almacenamiento local seguro si las variables de entorno aún no han sido configuradas)

---

## 📦 Ejecución en Desarrollo

1. Instala las dependencias:
   ```bash
   pnpm install
   # o
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   # o
   npm run dev
   ```

3. Abre en tu navegador [http://localhost:3000](http://localhost:3000).

---

## 🗄️ Conexión con Supabase (Opcional)

El proyecto funciona **de inmediato** sin base de datos gracias a su sistema de contingencia. Cuando decidas activar Supabase:

1. Crea un proyecto gratuito en [supabase.com](https://supabase.com).
2. Ve al **SQL Editor** de Supabase y pega el contenido del archivo [`supabase/schema.sql`](./supabase/schema.sql).
3. Copia tu `Project URL` y tu `anon public key` en tu archivo `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-publica
   ```

---

## 🌐 Despliegue en Vercel

1. Sube este repositorio a tu cuenta de GitHub (`NotDavid-03/IsaiasONG`).
2. Entra a [vercel.com](https://vercel.com) e inicia sesión con tu GitHub.
3. Haz clic en **"Add New... > Project"** y selecciona el repositorio **IsaiasONG**.
4. (Opcional) En la sección **Environment Variables**, agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Haz clic en **Deploy**. ¡Tu página estará en línea en menos de 2 minutos!
