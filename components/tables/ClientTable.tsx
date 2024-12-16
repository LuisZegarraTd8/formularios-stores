import {
    DataGrid, GridColDef, GridRowSelectionModel, GridToolbar,
    GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport,
    GridToolbarQuickFilter
} from '@mui/x-data-grid';
import { Box, useMediaQuery } from '@mui/material';
import { useOrderStore } from "@/src/store";
import { useEffect, useState } from 'react';
import { getDocTypeAbbr, loadClients } from '@/src/services/clientService';

function CustomToolbar() {
    return (
    <GridToolbarContainer>
        <GridToolbarDensitySelector 
        slotProps={{ tooltip: { title: 'Cambiar densidad' } }} 
        />
        <GridToolbarExport 
        slotProps={{ tooltip: { title: 'Exportar datos' } }} 
        />
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarQuickFilter /> {/* Agrega la barra de búsqueda */}
    </GridToolbarContainer>
    );
}

const columns: GridColDef[] = [
    {
        field: 'personIdType',
        headerName: 'Tipo de Documento',
        editable: false,
        disableColumnMenu: true,
        maxWidth: 200,
        flex: 186,
        minWidth: 176,
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'personId',
        headerName: 'Número de Documento',
        editable: false,
        disableColumnMenu: true,
        maxWidth: 240,
        flex: 186,
        minWidth: 200,
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'names',
        headerName: 'Nombre y Apellido',
        editable: false,
        disableColumnMenu: true,
        maxWidth: 280,
        flex: 256,
        minWidth: 240,
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'email',
        headerName: 'Correo Electrónico',
        editable: false,
        disableColumnMenu: true,
        flex: 280,
    },
    {
        field: 'phoneNumber',
        headerName: 'N° de Teléfono',
        disableColumnMenu: true,
        maxWidth: 200,
        flex: 192,
        minWidth: 176,
        align: 'center',
        headerAlign: 'center',
    },
];


export default function ClientTable( ) {

    const allClients = useOrderStore((state) => state.allClients);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 6, // Valor por defecto
        page: 0,
    });

    const rows = allClients.map(client => ({
        ...client,
        id: client.id,
        personIdType: `${getDocTypeAbbr(client.personIdType)}`,
        names: `${client.firstName}, ${client.lastName}`,
    }));
    
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isLargeScreen = useMediaQuery('(min-width:1536px)');

    useEffect(() => {
        let newPageSize = 6; // Valor por defecto
        if (isSmallScreen) {
            newPageSize = 4;
        } else if (isLargeScreen) {
            newPageSize = 7;
        }

        setPaginationModel({ ...paginationModel, pageSize: newPageSize });
    }, [isSmallScreen, isLargeScreen]);

    return (
        <div className='w-full h-fit'>
            <DataGrid
                sx={{border: 'none',
                    width: '100%',
                    '& .container--top': {
                        background: 'none',
                    },
                    '& .MuiDataGrid-container--top [role=row]': {
                        backgroundColor: '#e7e5e4',
                        borderBottomWidth: 2,
                        borderBottomColor: '#BFBFBF',
                        borderTopRightRadius: 6,
                        borderTopLeftRadius: 6, 
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 700,
                    },
                    '& .MuiDataGrid-toolbarContainer': {
                        marginBottom: '8px',
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomWidth: 2,
                        borderBottomColor: '#BFBFBF', 
                    },               
                }}
                rows={rows}
                autosizeOnMount= {true}
                columns={columns}
                keepNonExistentRowsSelected
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[4, 5, 7, { value: -1, label: 'Todos' }]}
                slots={{
                    toolbar: CustomToolbar
                }}
                localeText={{
                    toolbarDensity: 'Densidad',
                    toolbarExport: 'Exportar',
                    toolbarQuickFilterPlaceholder: 'Buscar',

                    toolbarDensityCompact: 'Compacto',
                    toolbarDensityStandard: 'Estándar',
                    toolbarDensityComfortable: 'Cómodo',
                    toolbarExportCSV: 'Exportar como CSV',
                    toolbarExportPrint: 'Imprimir',
                    noResultsOverlayLabel: 'No se encotraron resultados.',
                    MuiTablePagination: {
                        labelDisplayedRows: ({ from, to, count }) =>
                          `${from} - ${to} de ${count === -1 ? `más que ${to}` : count}`,
                        labelRowsPerPage: 'Filas por Página',
                    },
                    footerRowSelected: (count) =>
                        count !== 1
                            ? `${count.toLocaleString()} estudios seleccionados`
                            : `${count.toLocaleString()} estudio seleccionado`,
                }}
            />
        </div>
    );
}