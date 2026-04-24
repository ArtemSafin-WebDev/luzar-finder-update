(function () {
  const DEFAULT_ENDPOINTS = {
    state: "/api/parts-finder",
    submit: "/api/parts-finder",
    deleteHistory: "/api/parts-finder/history/:id",
  };
  const STEPS = ["brand", "model", "year", "engine", "modification"];

  const MOCK_DATA = {
    title: "Подберите детали для легковых и грузовых автомобилей",
    tabs: [
      {
        id: "vehicle",
        label: "Подобрать по авто",
        active: true,
        disabled: false,
      },
      {
        id: "vin",
        label: "Подобрать по VIN и госномеру",
        active: false,
        disabled: true,
      },
    ],
    fields: [
      {
        id: "brand",
        type: "single",
        label: "Марка",
        placeholder: "Марка",
        queryKey: "brand",
      },
      {
        id: "model",
        type: "single",
        label: "Модель",
        placeholder: "Модель",
        queryKey: "model",
      },
      {
        id: "year",
        type: "single",
        label: "Год",
        placeholder: "Год",
        queryKey: "year",
      },
      {
        id: "engine",
        type: "single",
        label: "Объем двигателя",
        placeholder: "Объем двигателя",
        queryKey: "engine",
      },
      {
        id: "modification",
        type: "single",
        label: "Модификация",
        placeholder: "Модификация",
        queryKey: "modification",
      },
      {
        id: "productGroups",
        type: "multi",
        label: "Группа товаров",
        placeholder: "Группа товаров",
        queryKey: "group",
      },
    ],
    vehicles: [
      {
        id: "volkswagen",
        label: "Volkswagen",
        models: [
          {
            id: "tiguan",
            label: "Tiguan",
            years: [
              {
                id: "2016",
                label: "2016",
                engines: [
                  {
                    id: "20-petrol",
                    label: "2.0 бензиновый",
                    modifications: [
                      { id: "tsi-14-20", label: "бензин TSI 1.4-2.0 л" },
                      { id: "tsi-20-180", label: "2.0 TSI 180 л.с." },
                    ],
                  },
                ],
              },
              {
                id: "2018",
                label: "2018",
                engines: [
                  {
                    id: "14-petrol",
                    label: "1.4 бензиновый",
                    modifications: [
                      { id: "tsi-14", label: "1.4 TSI 150 л.с." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "polo",
            label: "Polo",
            years: [
              {
                id: "2020",
                label: "2020",
                engines: [
                  {
                    id: "16-petrol",
                    label: "1.6 бензиновый",
                    modifications: [
                      { id: "mpi-16", label: "1.6 MPI 110 л.с." },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "lada",
        label: "Lada",
        models: [
          {
            id: "vesta",
            label: "Vesta",
            years: [
              {
                id: "2021",
                label: "2021",
                engines: [
                  {
                    id: "16-petrol",
                    label: "1.6 бензиновый",
                    modifications: [
                      { id: "vesta-16", label: "ВАЗ-21129 106 л.с." },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "haval",
        label: "Haval",
        models: [
          {
            id: "f7",
            label: "F7",
            years: [
              {
                id: "2022",
                label: "2022",
                engines: [
                  {
                    id: "15-turbo",
                    label: "1.5 бензиновый",
                    modifications: [{ id: "gw4b15", label: "GW4B15 150 л.с." }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "chery",
        label: "Chery",
        models: [
          {
            id: "tiggo-7",
            label: "Tiggo 7 Pro",
            years: [
              {
                id: "2023",
                label: "2023",
                engines: [
                  {
                    id: "15-turbo",
                    label: "1.5 бензиновый",
                    modifications: [
                      { id: "sqre4t15c", label: "SQRE4T15C 147 л.с." },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "bmw",
        label: "BMW",
        models: [
          {
            id: "5",
            label: "5",
            years: [
              {
                id: "2018",
                label: "2018",
                engines: [
                  {
                    id: "14-petrol",
                    label: "1.4 бензиновый",
                    modifications: [{ id: "e60", label: "E60 (03-)" }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "geely",
        label: "Geely",
        models: [{ id: "coolray", label: "Coolray", years: [] }],
      },
      {
        id: "kia",
        label: "Kia",
        models: [{ id: "rio", label: "Rio", years: [] }],
      },
      {
        id: "hyundai",
        label: "Hyundai",
        models: [{ id: "solaris", label: "Solaris", years: [] }],
      },
      {
        id: "skoda",
        label: "Skoda",
        models: [{ id: "octavia", label: "Octavia", years: [] }],
      },
      {
        id: "toyota",
        label: "Toyota",
        models: [{ id: "camry", label: "Camry", years: [] }],
      },
    ],
    productGroups: [
      { id: "radiators", label: "Радиаторы" },
      { id: "water-pumps", label: "Насосы водяные" },
      { id: "fans", label: "Вентиляторы" },
      { id: "thermostats", label: "Термостаты" },
      { id: "cooling-components", label: "Компоненты системы охлаждения" },
      { id: "ac-compressors", label: "Компрессоры кондиционера" },
      { id: "ac-components", label: "Компоненты системы кондиционирования" },
      { id: "engine-parts", label: "Детали двигателя" },
      { id: "air-compressors", label: "Компрессоры воздушные" },
      { id: "filters", label: "Фильтры" },
    ],
  };

  const HISTORY_SEED = [
    {
      id: "audi-a4-2015",
      brand: { id: "audi", label: "Audi" },
      model: { id: "a4-b8", label: "A4 B8 (08-)" },
      year: { id: "2015", label: "2015" },
      engine: { id: "20-petrol", label: "2.0 бензиновый" },
      modification: { id: "a4-tfsi", label: "A4 2.0 TFSI quattro 190 л.с." },
      vin: "1234567890ABCDEFG",
      plate: "",
    },
    {
      id: "bmw-5-2018",
      brand: { id: "bmw", label: "BMW" },
      model: { id: "5", label: "5" },
      year: { id: "2018", label: "2018" },
      engine: { id: "14-petrol", label: "1.4 бензиновый" },
      modification: { id: "e60", label: "E60 (03-)" },
      vin: "WDB1240821F323866",
      plate: "у888нд198",
    },
    {
      id: "mercedes-c-2024",
      brand: { id: "mercedes", label: "Mercedes-Benz" },
      model: { id: "c-w205", label: "C-Class W205 (14-)" },
      year: { id: "2024", label: "2024" },
      engine: { id: "15-petrol", label: "1.5 бензиновый" },
      modification: { id: "c180-amg", label: "C 180 AMG Line 156 л.с." },
      vin: "",
      plate: "",
    },
  ];

  class MockPartsFinderApi {
    constructor(endpoints = DEFAULT_ENDPOINTS) {
      this.data = MOCK_DATA;
      this.history = [...HISTORY_SEED];
      this.endpoints = normalizeEndpoints(endpoints);
    }

    async getState(params) {
      const url = this.buildUrl(params.selected);
      await wait(140);
      return this.buildResponse(params, url, "GET");
    }

    async deleteHistory(id, params) {
      this.history = this.history.filter((item) => item.id !== id);
      const url = this.buildUrl(
        params.selected,
        resolveEndpoint(this.endpoints.deleteHistory, { id }),
      );
      await wait(140);
      return this.buildResponse(params, url, "DELETE");
    }

    buildUrl(selected, endpoint = this.endpoints.state) {
      const url = new URL(endpoint, window.location.origin);
      appendSelectedParams(url, selected);
      return url;
    }

    buildResponse(params, url, method) {
      const selected = normalizeSelected(params.selected);
      const options = this.getOptions(selected);
      const controls = this.data.fields.map((field) => {
        const previousComplete = this.isPreviousComplete(field.id, selected);
        const value =
          field.type === "multi" ? selected.productGroups : selected[field.id];
        const fieldOptions =
          field.id === "productGroups"
            ? this.data.productGroups
            : options[field.id];

        return {
          ...field,
          disabled: field.id === "brand" ? false : !previousComplete,
          value,
          options: fieldOptions,
          allSelected:
            field.id === "productGroups" &&
            value.length === this.data.productGroups.length,
        };
      });

      return {
        endpoint: this.endpoints.submit,
        request: {
          method,
          query: queryToObject(url.searchParams),
          selected,
        },
        title: this.data.title,
        mode: "vehicle",
        tabs: this.data.tabs,
        controls,
        submit: {
          label: "Подобрать",
          disabled: !STEPS.every((key) => selected[key]),
        },
        history: {
          enabled: true,
          label: "Мои авто",
          items: this.history,
        },
      };
    }

    isPreviousComplete(fieldId, selected) {
      if (fieldId === "brand") return true;
      if (fieldId === "productGroups")
        return STEPS.every((key) => selected[key]);
      const index = STEPS.indexOf(fieldId);
      return STEPS.slice(0, index).every((key) => selected[key]);
    }

    getOptions(selected) {
      const brand = this.data.vehicles.find(
        (item) => item.id === selected.brand?.id,
      );
      const model = brand?.models.find(
        (item) => item.id === selected.model?.id,
      );
      const year = model?.years.find((item) => item.id === selected.year?.id);
      const engine = year?.engines.find(
        (item) => item.id === selected.engine?.id,
      );

      return {
        brand: this.data.vehicles.map(toOption),
        model: (brand?.models || []).map(toOption),
        year: (model?.years || []).map(toOption),
        engine: (year?.engines || []).map(toOption),
        modification: (engine?.modifications || []).map(toOption),
      };
    }
  }

  function normalizeSelected(selected) {
    return {
      brand: selected.brand || null,
      model: selected.model || null,
      year: selected.year || null,
      engine: selected.engine || null,
      modification: selected.modification || null,
      productGroups: Array.isArray(selected.productGroups)
        ? selected.productGroups
        : [],
    };
  }

  function normalizeEndpoints(endpoints = {}) {
    return {
      ...DEFAULT_ENDPOINTS,
      ...endpoints,
    };
  }

  function appendSelectedParams(url, selected) {
    Object.entries(normalizeSelected(selected)).forEach(([key, value]) => {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach((item) => url.searchParams.append("group", item.id));
        return;
      }
      url.searchParams.set(key, value.id);
    });
  }

  function resolveEndpoint(endpoint, params = {}) {
    return Object.entries(params).reduce((result, [key, value]) => {
      const encoded = encodeURIComponent(value);
      return result
        .replaceAll(`:${key}`, encoded)
        .replaceAll(`{${key}}`, encoded);
    }, endpoint);
  }

  function toOption(item) {
    return { id: item.id, label: item.label };
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function queryToObject(searchParams) {
    return Array.from(searchParams.keys()).reduce((result, key) => {
      const values = searchParams.getAll(key);
      result[key] = values.length > 1 ? values : values[0];
      return result;
    }, {});
  }

  window.MockPartsFinderApi = MockPartsFinderApi;
})();
