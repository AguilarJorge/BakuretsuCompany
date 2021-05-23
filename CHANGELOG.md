# Changelog
<p align="center">
  <img src="img/logo.png" width="200" />
</p>

>
> **Tags:**
> - :boom:       [ Cambio importante ]
> - :eyeglasses: [ Cumplimiento de especificaciones ]
> - :rocket:     [ Nueva caracteristica ]
> - :bug:        [ Bug Fix ]
> - :nail_care:  [ Mejora ]

我用中文寫了些東西，使它看起來更專業 😎

## v1.1.0 (2021-05-22)

#### :nail_care: Switch de DarkTheme
  Se agregaron botones del switch para el `DarkTheme` para que puedan elegir donde lo quieren
  <img src="repoAssets/darkThemeOptions.jpg" width="500" title="dark theme options"/>
  * Puedes poner el boton dentro de cualquier `bakuretsu_drop > dropContent > wrapper` (como si fuera un link)
  ```html
  <li class="link themeToggle inDropThemeToggle">
    <span class="inDropThemeToggleWrapper">
      <div class="bakuretsu_icono themeToggle">
        <svg class="light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="14"></circle>
          <path d="M32 2v8m0 44v8m30-30h-8m-44 0H2m8.8-21.2l5.6 5.6m31.2 31.2l5.6 5.6m0-42.4l-5.6 5.6M16.4 47.6l-5.6 5.6">
          </path>
        </svg>
        <svg class="dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <path d="M35 2a25 25 0 0 1-22 36.8 24.9 24.9 0 0 1-10.6-2.3A30 30 0 1 0 35 2z"></path>
        </svg>
      </div>
      <span class="animLabel"></span>
    </span>
  </li>
  ```

  * Tambien puedes poner el boton flotante(fixed) dentro de la pagina
  ```html
  <div class="bakuretsu_fixedButton bakuretsu_icono themeToggle">
      <svg class="light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <title>Activar tema obscuro</title>
        <circle cx="32" cy="32" r="14"></circle>
        <path d="M32 2v8m0 44v8m30-30h-8m-44 0H2m8.8-21.2l5.6 5.6m31.2 31.2l5.6 5.6m0-42.4l-5.6 5.6M16.4 47.6l-5.6 5.6">
        </path>
      </svg>
      <svg class="dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <title>Activar tema claro</title>
        <path d="M35 2a25 25 0 0 1-22 36.8 24.9 24.9 0 0 1-10.6-2.3A30 30 0 1 0 35 2z"></path>
      </svg>
    </div>
  ```

#### :bug: Drops del menu no se despliegan correctamente
  Se agregaron botones del switch para el `DarkTheme` para que puedan elegir donde lo quieren
  <img src="repoAssets/dropsMenu.gif" width="300" title="dark theme options"/>

#### :rocket: Touch actions para los sliders (mobile)
  Ahora los elementos `bakuretsu_slider` tienen soporte para moverse con los dedos en dispositivos mobiles
