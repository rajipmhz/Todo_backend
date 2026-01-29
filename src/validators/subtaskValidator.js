const yup=require("yup");

const createSubtaskSchema=yup.object({
    title: yup.string().required(),
  start_time: yup.string().required(),
  end_time: yup.string().required(),
  status: yup.string().oneOf(["pending", "completed"]).default("pending"),
})

const updateSubtaskSchema=yup.object({
  title: yup.string(),
  start_time: yup.string(),
  end_time: yup.string(),
  status: yup.string().oneOf(["pending", "completed"]),
})

module.exports={createSubtaskSchema,updateSubtaskSchema}