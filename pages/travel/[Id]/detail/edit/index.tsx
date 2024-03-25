import EditForm from "@/components/form/editForm";

function Edit() {
  return (
    <div className="bg-bg-04 flex flex-col justify-start items-center pb-80">
      <h1 className="h-120 text-32 font-extrabold text-text-01 flex items-center tablet:h-100 tablet:text-24">
        모집글 수정하기
      </h1>
      <EditForm />
    </div>
  );
}

export default Edit;