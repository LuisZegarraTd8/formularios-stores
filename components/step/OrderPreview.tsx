import { Alert } from '@mui/material'
import SelectedClientDetails from '../list/SelectedClientDetail'
import SelectedServiciesTable from '../tables/SelectedServiciesTable'
import TotalQuote from '../tables/TotalQuote'
import { useOrderStore } from '@/src/store'
import GreyButton from "../buttons/GreyButton"
import BlueButton from "../buttons/BlueButton"


export default function OrderPreview() {

    const selectedItems = useOrderStore( (state) => state.selectedLabItems )
    const totalAmountOrder  = useOrderStore( (state) => state.totalAmountOrder )
    const selectedClient = useOrderStore( (state) => state.selectedClient )

  return (
    <div className="flex flex-col gap-5">
        <div className="mx-auto">
            <Alert variant="filled" severity="info" sx={{ backgroundColor:'#47A2BC', fontSize: 16, ...(window.innerWidth < 1280 && { fontSize: 15}) }}>
            Por favor antes de continuar, revise y verifique que la información del paciente, como también los estudios sean correctos.
            </Alert>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[35rem] 2xl:min-h-[43rem]'>
            {/* Client Preview */}
            <div className="p-6 rounded-lg bg-neutral-100 flex flex-col justify-start gap-2 shadow-md">
                <h2 className="text-center text-lg font-bold text-negro-claro uppercase py-2 border-b-4 border-gris-oscuro/30 h-fit">
                    Datos del Cliente seleccionado:
                </h2>
                
                <div className="flex flex-col justify-between h-full">
                    <SelectedClientDetails client={selectedClient} />
                    <div className="flex flex-col lg:flex-row gap-3 justify-center">
                        <BlueButton>
                            Elegir otro Cliente
                        </BlueButton>

                        <GreyButton>
                            Cambiar Estudios
                        </GreyButton>     
                    </div>
                </div>
            </div>

            {/* Labs Preview */}
            <div className="p-6 rounded-lg bg-neutral-100 flex flex-col justify-start gap-2 shadow-md">
                <h2 className="text-center text-lg font-bold text-negro-claro uppercase py-2 border-b-4 border-gris-oscuro/30 h-fit">
                    Estudios seleccionados:
                </h2>
                
                <div className="flex flex-col justify-between h-full">
                    <div className='px-4'>
                        <SelectedServiciesTable selectedLabItems = {selectedItems}/>
                    </div>

                    <TotalQuote description={'Total de los Estudios:'} total={totalAmountOrder}/>
                </div>
            </div>
        </div>
    </div>
  )
}