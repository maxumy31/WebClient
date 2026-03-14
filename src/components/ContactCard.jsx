import SvgIcon from "./SvgIcon";

export default function ContactCard(
  { id, 
    name, 
    phone, 
    email,
    onDelete,
  }) {

  return (
    <div className="ring-1 ring-base-300 p-4 flex flex-row rounded-lg w-[60%] min-w-fit justify-between items-center card card-dash">
      
      <div className="flex flex-row gap-4 items-center basis-1/3 min-w-0">
        <SvgIcon name="account_circle_icon" className={"w-6 h-6 text-primary"}/>
        <span className="truncate">{name}</span>
      </div>

      <div className="flex flex-row gap-12 items-center basis-2/3 justify-between min-w-0">
        <span className="flex flex-row gap-4 items-center min-w-0">
          <span>
            <SvgIcon name="phone_icon" className={"w-6 h-6 text-primary"}/>
          </span>
          <span className="truncate">{phone}</span>
        </span>

        <span className="flex flex-row gap-4 items-center min-w-0">
          <span>
            <SvgIcon name="mail_icon" className={"w-6 h-6 text-primary"}/>
          </span>
          <span className="truncate">{email}</span>
        </span>

        <button className="btn btn-ghost shrink-0" onClick={() => {onDelete(id)}}>
          <SvgIcon name="trash_icon" className={"w-6 h-6 text-primary"}/>
        </button>
      </div>
      
    </div>
  );
}