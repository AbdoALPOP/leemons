module.exports = {
  common: {
    save: 'Guardar',
    view: 'Ver',
    edit: 'Editar',
  },
  welcome_page: {
    page_title: 'Asignaturas',
    page_subtitle:
      'Desde aquí podrás gestionar todas las asignaturas que se imparten en el centro.',
    page_info: `<p>Se pueden crear grupos de asignaturas por áreas (por ejemplo, el bloque de matemáticas podría contener Preálgebra, Álgebra I, Geometría, Álgebra II y Trigonometría).</p>
      <p>Las asignaturas están relacionadas entre sí por su bloque de conocimientos, también pueden ser sucesivas (por ejemplo, para cursar Álgebra II es necesario haber aprobado Álgebra I).</p>`,
    docs_btn: {
      label: 'Ver la documentación',
      url: '/',
    },
    hide_info_label:
      'Ok, entendido. Cuando la configuración esté completa, no mostrar más esta información.',
    template_load: {
      title: 'Cargar plantilla',
      description: 'Descarga el archivo básico y súbelo una vez completado.',
      btn: 'Seleccionar archivo',
    },
    manual_load: {
      title: 'Creación manual',
      description: 'Define tu propia estructura utilizando nuestro editor visual.',
      btn: 'Crear árbol',
    },
  },
  tree_page: {
    page_title: 'Asignaturas',
    page_subtitle: 'Crear Árbol y Dataset',
    page_info: {
      pre:
        'El árbol permite crear agrupaciones de asignaturas para adaptar el modelo de datos a los planes educativos de su centro.',
      post:
        'Utiliza el botón + para crear cada nivel, luego utiliza el panel derecho para configurar el conjunto de datos del nivel.',
    },
  },
  delete_modal: {
    title: 'Eliminar',
    message: '¿Estás seguro de eliminar este nivel?',
    actions: {
      accept: 'Si',
      cancel: 'No',
    },
  },
  save_without_saving_modal: {
    title: '¿Salir sin guardar?',
    message: {
      top: 'Si sales sin guardar, perderás las modificaciones realizadas.',
      bottom: '¿Seguro que quieres salir sin guardar?',
    },
    actions: {
      discard: 'Si, salir y descartar cambios',
      cancel: 'No, volver',
    },
  },
  template: {
    title: '¿Cargar plantilla para ahorrar tiempo?',
    description:
      'Elige el tipo de plantilla y haz click en cargar árbol, más tarde podrás modificar los datasets de cada nivel de acuerdo a las necesidades de tu organización',
    country_select: 'Elegir un país',
    template_select: 'Elegir una plantilla',
    btn: 'Previsualizar plantilla',
    hide_info: {
      description: 'Prefiero hacerlo manualmente.',
      btn: `No volver a mostrar`,
    },
  },
  translationsDrawer: {
    title: 'Traducciones',
    actions: {
      save: 'Guardar',
      cancel: 'Cancelar',
    },
  },
  tree: {
    new: {
      prefix: { levelSchema: 'Añadir nivel', level: 'Añadir' },
    },
    class_level: 'Nivel de asignatura',
  },
  editor: {
    form: {
      name: {
        placeholder: 'Nombre del nivel',
      },
      description: {
        placeholder: 'Descripción del nivel',
      },
      isSubject: {
        label: 'Nivel de asignatura',
        tooltip: 'Nivel mínimo de asignación de estudiantes',
      },
      save: 'Guardar nivel',
    },
    translations: {
      label: 'Traducciones',
      tooltip: 'El contenido no traducido aparecerá en el idioma por defecto',
    },
    tabs: {
      dataset: {
        label: 'Más datos',
      },
      permissions: {
        label: 'Permisos',
      },
    },
  },
  class_list: {
    page_title: 'Administración de asignaturas',
    page_info:
      'Aquí puedes encontrar y administrar la estructura de niveles de tu Universidad y asignar estudiantes a clases.',
    details: {
      type_program: 'programas',
      type_courses: 'cursos',
      type_groups: 'grupos',
    },
    class_table: {
      th_tutor: 'Tutor',
      th_students: 'Alumnos',
      th_actions: 'Aciones',
      btn_edit: 'Editar',
      btn_expand: 'Expandir',
      btn_view: 'Ver',
    },

    view_panel: {
      summary: {
        btn_edit: 'Editar',
        btn_expand: 'Expandir',
        counter: 'Alumnos',
      },
      table: {
        th_name: 'Nombre de Pila',
        th_surename: 'Primer Apellido',
        th_email: 'Dirección E-mail',
        th_birthday: 'F.Nacimiento',
      },
    },
  },
  edit_level_page: {
    page_title: 'Administración de clases',
    tutor: {
      title: 'Tutor',
      description: 'Asignar tutor a este grupo',
      label: 'Buscar',
      placeholder: 'Busca un tutor',
      btn_apply: 'Asignar',
      btn_change: 'Cambiar tutor',
    },
    students: {
      title: 'Estudiantes',
      description: 'Asignar estudiantes a este grupo desde la base de datos de estudiantes.',
      option01: 'Seleccionar por Tag',
      option02: 'Buscar',
      option03: 'Carga masiva de IDs',
      label: 'Asignar',
      placeholder: 'Comienza a escribir un Tag',
      btn_add: 'Añadir Tag',
      btn_search: 'Buscar por estos Tags',
      btn_search2: 'Buscar',
      btn_edit: 'Editar Tags',
      btn_search_again: 'Buscar de nuevo',
      error_long: 'Han aparecido más de 50 Tags, agregue más tags para delimitar su búsqueda ',
      title_results: 'Hemos encontrado',
      error_repeat:
        '2 estudiantes (en rojo) ya están incluidos en esta clase por lo que no se podrán añadir de nuevo',
      btn_add_selected: 'Añadir la selección a este grupo',
      counter_label: 'seleccionados',
      info_search: 'Busca por email o introduce al menos otros dos datos para realizar la búsqueda',
      option_name: 'Nombre de Pila',
      option_surename: 'Primer Apellido',
      option_email: 'E-mail',
      option_birthday: 'F. Nacimiento',
      results_by_name: ' por ',
      results_by_birthdate: ' nacidos el ',
      error_not_found:
        'No hemos encontrado ningún resultado con esos datos, por favor inténtalo de nuevo buscando por email',
    },
    table: {
      th_actions: 'Seleccionar todos',
      th_name: 'Nombre de Pila',
      th_surename: 'Primer Apellido',
      th_email: 'Dirección E-mail',
      th_birthday: 'F. Nacimiento',
    },
  },
};
