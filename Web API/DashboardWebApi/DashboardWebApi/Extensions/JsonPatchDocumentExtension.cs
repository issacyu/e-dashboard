using System.Collections.Generic;
using System.Threading.Tasks;
using DashboardWebApi.DTOs;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;

namespace DashboardWebApi.Extensions
{
    public static class JsonPatchDocumentExtension
    {
        /// <summary>
        /// Handle the edge case when adding new row to any data grid.
        /// When adding new row to a grid, the path in patchDoc should
        /// be "/-"(it means adding new array item to the end of array).
        /// </summary>
        /// <param name="patchDoc">The json patch document.</param>
        public static async Task ModifyPatchPath(this JsonPatchDocument<IEnumerable<SaleForUpdateDto>> patchDoc, int collectionSize)
        {
            foreach (Operation operation in patchDoc.Operations)
            {
                if (operation.OperationType.ToString() == "Add" && int.TryParse(operation.path.Split("/")[1], out var index))
                {
                    if (index >= collectionSize)
                    {
                        operation.path = "/-";
                    }
                }
            }
        }

        /// <summary>
        /// Handle the edge case when adding new row to any data grid.
        /// When adding new row to a grid, the path in patchDoc should
        /// be "/-"(it means adding new array item to the end of array).
        /// </summary>
        /// <param name="patchDoc">The json patch document.</param>
        public static async Task ModifyPatchPath(this JsonPatchDocument<IEnumerable<InventoryForUpdateDto>> patchDoc, int collectionSize)
        {
            foreach (Operation operation in patchDoc.Operations)
            {
                if (operation.OperationType.ToString() == "Add" && int.TryParse(operation.path.Split("/")[1], out var index))
                {
                    if (index >= collectionSize)
                    {
                        operation.path = "/-";
                    }
                }
            }
        }
    }
}
