const yup =require("yup");

const createTodoSchema=yup.object({
      title: yup.string().required(),
  date: yup.string().required(),
  day: yup.string().required(),
  start_time: yup.string().required(),
  end_time: yup.string().required(),
  category: yup.string().required(),
  status: yup.string().oneOf(["pending", "completed"]).default("pending"),
})


const updateTodoSchema=yup.object({
title: yup.string(),
  date: yup.string(),
  day: yup.string(),
  start_time: yup.string(),
  end_time: yup.string(),
  category: yup.string(),
  status: yup.string().oneOf(["pending", "completed"]),
})

module.exports={createTodoSchema,updateTodoSchema}