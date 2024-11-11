/** Представляет склад Wildberries с тарифами на доставку и хранение коробов */
interface Warehouse {
    /** Коэффициент (в %), на который умножается стоимость доставки и хранения. Все цены содержат финальные данные с учетом этого коэффициента */
    boxDeliveryAndStorageExpr: string;

    /** Стоимость доставки первого литра (в ₽) */
    boxDeliveryBase: string;

    /** Стоимость доставки каждого следующего литра (в ₽) */
    boxDeliveryLiter: string;

    /** Стоимость хранения первого литра (в ₽) */
    boxStorageBase: string;

    /** Стоимость хранения каждого следующего литра (в ₽) */
    boxStorageLiter: string;

    /** Название склада Wildberries */
    warehouseName: string;
}

/** Структура ответа API для тарифов на короба */
export interface BoxFeesResponse {
    response: {
        data: {
            /** Дата начала действия следующего тарифа (формат: YYYY-MM-DD) */
            dtNextBox: string;

            /** Дата окончания действия последнего установленного тарифа (формат: YYYY-MM-DD) */
            dtTillMax: string;

            /** Тарифы на короба, сгруппированные по складам Wildberries. Может быть null, если данные по складам отсутствуют */
            warehouseList: Warehouse[];
        };
    };
}
