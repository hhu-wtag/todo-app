import { getGlobalState, updateGlobalState } from "./Helpers/globalState.js"
import supabase from "./supabase.js"

export const getAllDataFromDB = async () => {
  const { data, error } = await supabase
    .from("Todo")
    .select()
    .order("created_at", { ascending: false })

  updateGlobalState({
    fetchedDataLength: data.length,
  })

  return {
    data,
    error,
  }
}

export const getDataOnLoadMore = async (searchText) => {
  let { activeFilter } = getGlobalState()

  const { data, error } = await supabase
    .from("Todo")
    .select()
    .ilike("title", `%${searchText}%`)
    .order("created_at", { ascending: false })

  let filteredData = []

  if (activeFilter === "inc") {
    filteredData = data.filter((item) => !item.done)
  } else if (activeFilter === "com") {
    filteredData = data.filter((item) => item.done)
  } else filteredData = data

  updateGlobalState({
    fetchedDataLength: filteredData.length,
  })

  return {
    filteredData,
    error,
  }
}

export const getFilterdData = async (done, searchText) => {
  const { data, error } = await supabase
    .from("Todo")
    .select()
    .match({ done })
    .ilike("title", `%${searchText}%`)
    .order("created_at", { ascending: false })

  updateGlobalState({
    fetchedDataLength: data.length,
  })

  return {
    data,
    error,
  }
}

export const getAllFilterdData = async (searchText) => {
  const { data, error } = await supabase
    .from("Todo")
    .select()
    .ilike("title", `%${searchText}%`)
    .order("created_at", { ascending: false })

  return {
    data,
    error,
  }
}

export const insertDataToDB = async (state) => {
  const { title } = state

  const { data, error } = await supabase.from("Todo").insert([
    {
      title: title,
    },
  ])

  return {
    data,
    error,
  }
}

export const deleteDataByID = async (id) => {
  const { data, error } = await supabase.from("Todo").delete().match({ id })

  return {
    data,
    error,
  }
}

export const updateDataByID = async (id, state) => {
  const { data, error } = await supabase
    .from("Todo")
    .update({ title: state })
    .match({ id })

  return {
    data,
    error,
  }
}

export const updateDone = async (id, doneIn) => {
  const { data, error } = await supabase
    .from("Todo")
    .update({ done: true, doneIn })
    .match({ id })

  return {
    data,
    error,
  }
}

export const searchDB = async (searchText) => {
  const { data, error } = await supabase
    .from("Todo")
    .select()
    .ilike("title", `%${searchText}%`)
    .order("created_at", { ascending: false })

  if (data) {
    updateGlobalState({
      fetchedDataLength: data.length,
    })
  }

  return { data, error }
}
