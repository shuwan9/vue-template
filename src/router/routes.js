const _default = {
  path: "/",
  redirect: "/login"
};

const Login = {
  path: "/login",
  component: () => import("@/views/Login")
};

const Home = {
  path: "/home",
  component: () => import("@/views/Home")
};
const Order = {
  path: "/order",
  component: () => import("@/views/Order"),
  children: [
    {
      path: "dish",
      component: () => import("@/views/Dish")
    },
    {
      path: "list",
      component: () => import("@/views/OrderList")
    }
  ]
};
const DishDetail = {
  path: "/dishdetail",
  component: () => import("@/views/DishDetail")
};
const ToOrder = {
  path: "/toOrder",
  component: () => import("@/views/ToOrder")
};
const OrderDetail = {
  path: "/orderdetail",
  component: () => import("@/views/OrderDetail")
};

const Car = {
  path: "/car",
  component: () => import("@/views/Car"),
  children: [
    {
      path: "wash",
      component: () => import("@/views/Car/Wash")
    },
    {
      path: "order",
      component: () => import("@/views/Car/Order")
    },
    {
      name: "confirm",
      path: "confirm",
      component: () => import("@/views/Car/Confirm")
    },
    {
      path: "complete",
      component: () => import("@/views/Car/Complete")
    },
    {
      path: "orderdetail",
      name: "car_order_detail",
      component: () => import("@/views/Car/OrderDetail")
    }
  ]
};

const Supermarket = {
  path: "/supermarket",
  component: () => import("@/views/Supermarket"),
  children: [
    {
      path: "products",
      component: () => import("@/views/Supermarket/Products")
    },
    {
      path: "orders",
      component: () => import("@/views/Supermarket/Orders")
    }
  ]
};
const SupermarketProductDetail = {
  path: "/supermarketproductdetail",
  component: () => import("@/views/SupermarketProductDetail")
};
const SpmConfirmOrder = {
  path: "/spmconfirmorder",
  component: () => import("@/views/SpmConfirmOrder")
};
const MealOrderMgm = {
  path: "/meal_order_mgm",
  component: () => import("@/views/order_mgm/meal/MealOrderMgm")
};
const MealOrderSummary = {
  path: "/meal_order_summary",
  component: () => import("@/views/order_mgm/meal/MealOrderSummary")
};
const MealOrderStatusChange = {
  path: "/meal_order_status_change",
  name: "meal_order_status_change",
  component: () => import("@/views/order_mgm/meal/MealOrderStatusChange")
};
const SpmOrderMgm = {
  path: "/spm_order_mgm",
  component: () => import("@/views/order_mgm/spm/SpmOrderMgm")
};
const SpmOrderStatusChange = {
  path: "/spm_order_status_change",
  name: "spm_order_status_change",
  component: () => import("@/views/order_mgm/spm/SpmOrderStatusChange")
};
const CarOrderMgm = {
  path: "/car_order_mgm",
  component: () => import("@/views/order_mgm/car/CarOrderMgm")
};
const CarOrderStatusChange = {
  path: "/car_order_status_change",
  name: "car_order_status_change",
  component: () => import("@/views/order_mgm/car/CarOrderStatusChange")
};

const SpmOrderDetail = {
  path: "/spm_order_detail",
  name: "spm_order_detail",
  component: () => import("@/views/spm_order_detail/SpmOrderDetail")
};

const NoPermission = {
  path: "/no_permission",
  component: () => import("@/views/no_permission/NoPermission")
};

export default [
  _default,
  Login,
  Home,
  Order,
  DishDetail,
  ToOrder,
  OrderDetail,
  Car,
  Supermarket,
  SupermarketProductDetail,
  SpmConfirmOrder,
  MealOrderMgm,
  MealOrderSummary,
  MealOrderStatusChange,
  SpmOrderMgm,
  SpmOrderStatusChange,
  CarOrderMgm,
  CarOrderStatusChange,
  SpmOrderDetail,
  NoPermission
];
